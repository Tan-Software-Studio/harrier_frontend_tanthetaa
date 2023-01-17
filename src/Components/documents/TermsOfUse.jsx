import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FileViewer from "react-file-viewer";
import { Document, Page, pdfjs } from "react-pdf";
import termsofuse from "./terms_of_use.pdf";
import privacypolicy from "./privacy_policy.pdf";
import termsofbusiness from "./terms_of_business.pdf";

const TermsOfUse = () => {
  const route = useLocation()?.pathname;

  const onError = (e) => {
    console.log(e, "Oops! Something went wrong");
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => setPageNumber((e) => pageNumber - 1);

  const goToNextPage = () => setPageNumber((e) => pageNumber + 1);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  return (
    <>
      {route === "/termsofuse" ? (
        <div className="TermsOfUse">
          <details open>
            <summary>Terms Of Use</summary>
            <FileViewer
              fileType="pdf"
              filePath={termsofuse}
              onError={onError}
            />
          </details>

          {/* <div>
            <nav>
              <button onClick={(e) => goToPrevPage()}>Prev</button>
              <button onClick={(e) => goToNextPage()}>Next</button>
            </nav>

            <div style={{ width: 600 }}>
              <Document
                file={termsofuse}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={console.error}
              >
                <Page pageNumber={pageNumber} width={600} />
              </Document>
            </div>

            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div> */}
        </div>
      ) : route === "/privacypolicy" ? (
        <div className="TermsOfUse">
          <details open>
            <summary>Privacy Policy</summary>
            <FileViewer
              fileType="pdf"
              filePath={privacypolicy}
              onError={onError}
            />
          </details>
        </div>
      ) : route === "/termsofbusiness" ? (
        <div className="TermsOfUse">
          <details open>
            <summary>Terms Of Business</summary>
            <FileViewer
              fileType="pdf"
              filePath={termsofbusiness}
              onError={onError}
            />
          </details>
        </div>
      ) : null}
    </>
  );
};

export default TermsOfUse;
