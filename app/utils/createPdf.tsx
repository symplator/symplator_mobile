import {t} from 'i18next';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

// Function to create and save the PDF
export const createPdf = async (
  symptoms: Symptom[],
  targetLanguage,
  currentLanguage,
): Promise<string> => {
  let options = {
    html:
      `<html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h1 {
          color: #333;
          font-size: 28px;
          text-align: center;
          margin-bottom: 30px;
        }
        .header {
          font-size: 25px;
          font-weight:800;
          color: #555;
          margin-top: 10px;
          margin-bottom: 20px;
        }
        .item-list {
          margin-left: 20px;
        }
        .item {
          margin-bottom: 5px;
          font-size: 22px;
        }
        .separator {
          height: 2px;
          background-color: #ccc;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <h1>${t('pdf.mainTitle')}</h1>
      
      <div class="header">${t('mySymptoms', {lng: targetLanguage})}</div>
      <div class="item-list">` +
      symptoms?.map(
        symptom =>
          ` <div class="item">${
            symptom?.translations?.find(
              translation => translation.language === targetLanguage,
            )?.name
          }</div>`,
      ) +
      `</div>
      <div class="separator"></div>
      <div class="header">${t('mySymptoms', {lng: currentLanguage})}</div>
      <div class="item-list">` +
      symptoms?.map(
        symptom =>
          `<div class="item">${
            symptom?.translations?.find(
              translation => translation.language === currentLanguage,
            )?.name
          }</div>`,
      ) +
      `</div>
    </body>
  </html>`,
    fileName: t('mySymptoms'),
    directory: 'Documents',
  };

  let file = await RNHTMLtoPDF.convert(options);

  return file.filePath;
};
