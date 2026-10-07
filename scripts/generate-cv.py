"""Generate downloadable, text-based CVs from the same content as the website.

Run with the bundled Python runtime; pass --font-dir containing DejaVuSans.ttf
and DejaVuSans-Bold.ttf. Each PDF must pass the one-page and link checks.
"""
import argparse
import json
from pathlib import Path
from html import escape
import shutil
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader
import pypdfium2 as pdfium

parser = argparse.ArgumentParser()
parser.add_argument('--font-dir', required=True, type=Path)
parser.add_argument('--qa-dir', type=Path)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
data = json.loads((root / 'src/data/cv.json').read_text())
portfolio_url = json.loads((root / 'src/data/cv-settings.json').read_text())['portfolioUrl']
pdfmetrics.registerFont(TTFont('CV', str(args.font_dir / 'DejaVuSans.ttf')))
pdfmetrics.registerFont(TTFont('CVBold', str(args.font_dir / 'DejaVuSans-Bold.ttf')))
pdfmetrics.registerFontFamily('CV', normal='CV', bold='CVBold')
ink = colors.HexColor('#171923')
styles = {
    'name': ParagraphStyle('name', fontName='CVBold', fontSize=23, leading=28, textColor=ink, spaceAfter=3),
    'role': ParagraphStyle('role', fontName='CVBold', fontSize=12, leading=16, textColor=ink, spaceAfter=3),
    'contact': ParagraphStyle('contact', fontName='CV', fontSize=9, leading=13, textColor=ink, spaceAfter=3),
    'heading': ParagraphStyle('heading', fontName='CVBold', fontSize=10.5, leading=14, textColor=ink, spaceBefore=11, spaceAfter=5, keepWithNext=True),
    'body': ParagraphStyle('body', fontName='CV', fontSize=10.2, leading=14.2, textColor=ink, spaceAfter=4),
    'job': ParagraphStyle('job', fontName='CV', fontSize=10.2, leading=14, textColor=ink, spaceBefore=4, spaceAfter=2),
    'bullet': ParagraphStyle('bullet', fontName='CV', fontSize=10.2, leading=14.2, textColor=ink, leftIndent=10, firstLineIndent=-10, spaceAfter=3),
}
out = root / 'public/cv'
out.mkdir(parents=True, exist_ok=True)
for locale, cv in data.items():
    path = out / f'garri-avetisyan-cv-{locale}.pdf'
    # Unicode cmap coverage is checked before writing: no missing Armenian glyphs.
    cmap = pdfmetrics.getFont('CV').face.charToGlyph
    missing = {c for c in json.dumps(cv, ensure_ascii=False) if ord(c) > 32 and ord(c) not in cmap}
    assert not missing, f'Missing glyphs: {missing}'
    story = []
    def p(text, style='body'): return Paragraph(text, styles[style])
    story.extend([p(escape(cv['name']), 'name'), p(escape(cv['role']), 'role'), p(escape(cv['location']), 'contact')])
    story.append(p('<link href="mailto:garryavetissian@gmail.com">garryavetissian@gmail.com</link>  ·  <link href="tel:+37455425408">+374 55 42 54 08</link>', 'contact'))
    story.append(p('<link href="https://linkedin.com/in/garri-avetisyan">linkedin.com/in/garri-avetisyan</link>', 'contact'))
    story.extend([p(escape(cv['summaryTitle']), 'heading'), p(escape(cv['summary']))])
    story.append(p(escape(cv['experienceTitle']), 'heading'))
    for job in cv['jobs']:
        block = [p(f'<b>{escape(job["role"])} — {escape(job["company"])}</b><br/>{escape(job["period"])}', 'job')]
        block.extend(p('• ' + escape(b), 'bullet') for b in job['bullets'])
        story.append(KeepTogether(block))
    story.append(p(escape(cv['projectsTitle']), 'heading'))
    story.extend(p('• ' + escape(item), 'bullet') for item in cv['projects'])
    story.extend([p(escape(cv['skillsTitle']), 'heading'), p(escape(cv['skills'])), p(escape(cv['tools']))])
    story.extend([p(escape(cv['languagesTitle']), 'heading'), p(escape(cv['languages']))])
    def draw_header_button(canvas, document):
        label = cv['portfolioLabel'] + ' ↗'
        font_size = 9
        width = pdfmetrics.stringWidth(label, 'CVBold', font_size) + 22
        height = 25
        x = A4[0] - document.rightMargin - width
        y = A4[1] - document.topMargin - height - 5
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor('#555555'))
        canvas.setLineWidth(.6)
        canvas.roundRect(x, y, width, height, 4, stroke=1, fill=0)
        canvas.setFillColor(colors.black)
        canvas.setFont('CVBold', font_size)
        canvas.drawString(x + 11, y + 9, label)
        canvas.linkURL(portfolio_url, (x, y, x + width, y + height), relative=0)
        canvas.restoreState()
    doc = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=40, rightMargin=40, topMargin=34, bottomMargin=34,
        title=f'{cv["name"]} — {cv["role"]}', author='Garri Avetisyan', subject='Curriculum Vitae')
    doc.build(story, onFirstPage=draw_header_button)
    pdf = PdfReader(path)
    assert len(pdf.pages) == 1, f'{locale}: expected one page, got {len(pdf.pages)}'
    extracted = pdf.pages[0].extract_text()
    assert cv['name'] in extracted and 'ANUNA LLC' in extracted, f'{locale}: text extraction failed'
    assert any(annotation.get_object().get('/A', {}).get('/URI') == portfolio_url for annotation in pdf.pages[0].get('/Annots', [])), 'Portfolio link missing'
    portfolio_link = next(annotation.get_object() for annotation in pdf.pages[0]['/Annots'] if annotation.get_object().get('/A', {}).get('/URI') == portfolio_url)
    assert portfolio_link['/Rect'][1] > A4[1] - 80, 'Portfolio button must be in the header'
    if args.qa_dir:
        args.qa_dir.mkdir(parents=True, exist_ok=True)
        rendered = pdfium.PdfDocument(str(path))
        rendered[0].render(scale=1.5).to_pil().save(args.qa_dir / f'cv-{locale}.png')
    print(f'{locale}: one page, selectable Unicode text, portfolio link verified; {len(extracted.split())} words')
shutil.copyfile(out / 'garri-avetisyan-cv-en.pdf', root / 'public/resume.pdf')
