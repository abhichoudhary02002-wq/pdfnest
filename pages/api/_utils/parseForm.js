import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false
  }
};

export function parseForm(req) {
  const form = new formidable.IncomingForm();
  form.multiples = true;
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}
