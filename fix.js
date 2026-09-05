const fs = require('fs');
const file = 'frontend/app/(student)/dashboard/payment/[id]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldFuncStart = content.indexOf('const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {');
if (oldFuncStart !== -1) {
  const nextFunc = content.indexOf('const handleEnroll = async () => {', oldFuncStart);
  
  const newFunc = const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      try {
        const url = await uploadToSupabase(file, 'uploads');
        if (url) {
          setProof(url);
        }
      } catch (err) {
        console.error('Upload failed', err);
        alert('Gagal mengupload gambar');
      }
    }
  };

  ;
  
  content = content.substring(0, oldFuncStart) + newFunc + content.substring(nextFunc);
  
  // also fix the enroll payload where base64Str was used
  content = content.replace('const base64Str = reader.result;', '');
  content = content.replace('proofOfPayment: base64Str,', 'proofOfPayment: proof,');
  content = content.replace('const reader = new FileReader();', '');
  content = content.replace('reader.readAsDataURL(uploadedFile);', '');
  content = content.replace('reader.onload = async () => {', 'if (proof) {');

  fs.writeFileSync(file, content);
  console.log('Fixed payment page!');
} else {
  console.log('Not found');
}
