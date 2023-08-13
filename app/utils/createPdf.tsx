import RNHTMLtoPDF from 'react-native-html-to-pdf';

// Function to create and save the PDF
export const createPdf = async (): Promise<string> => {
  let options = {
    html: '<h1>PDF TEST</h1>',
    fileName: 'test',
    directory: 'Documents',
  };

  let file = await RNHTMLtoPDF.convert(options);
  console.log(file.filePath);
  return file.filePath;
};
