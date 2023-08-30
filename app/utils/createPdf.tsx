import {t} from 'i18next';
import { Alert } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
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
        .itemSmall {
          margin-bottom: 5px;
          font-size: 15px;
          font-style: italic;
        }
        .separator {
          height: 2px;
          background-color: #ccc;
          margin: 20px 0;
        }
      </style>
    </head><
    <body>
      <h1>${t('pdf.mainTitle', {lng: targetLanguage})}</h1>
      <br>
      <div class="item-list">` +
      symptoms?.map(
        (symptom, index) =>
          ` <div class="item">${index + 1}. ${
            symptom?.translations?.find(
              translation => translation.language === targetLanguage,
            )?.name
          }</div>
          <div class="itemSmall"> ${
            symptom?.translations?.find(
              translation => translation.language === currentLanguage,
            )?.name
          }</div>
          <div class="separator"></div>
          `,
      ) +
      `</div>
    </body>
  </html>`,
    fileName: t('mySymptoms'),
    directory: 'Downloads',
  };

  let file = await RNHTMLtoPDF.convert(options);
  return file.filePath;
};
