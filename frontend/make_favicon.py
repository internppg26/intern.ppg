from PIL import Image
import sys

try:
    img = Image.open("public/logo.png")
    img = img.resize((256, 256), Image.Resampling.LANCZOS)
    img.save("public/favicon.ico", format='ICO', sizes=[(256, 256)])
    print("Favicon created")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)