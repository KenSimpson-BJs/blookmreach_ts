import React from "react";
import "./CategoryBubbles.scss";

export function CategoryBubbles({ component, page }) {
  const { clpPage, bgHex, bgImg, fontColor, headline } =
    component.getParameters();
  const { categoryItems: documentRef } = component.getModels();
  const document = documentRef && page.getContent(documentRef);
  if (!document) return page.isPreview() ? <div id="noDoc-error"></div> : null;

  const { analyticsImage: items } = document.getData();

  const css = `
  .BJsCategories {
    ${bgHex && `background-color: ${bgHex};`}
    ${bgHex && `background-image: url(${bgImg});`}
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  ${
    fontColor &&
    `.BJsCategories a, .BJsCategories a:hover {
    color: ${fontColor};
  }`
  }`;

  return (
    <section className="dc_mod BJsCategories py-5 text-center">
      <style>{css}</style>
      <div className="w-1280px container">
        <div className="row justify-content-center">
          <div
            className={`${clpPage ? "tile-heading " : ""}col-12 pb-4 pb-md-5`}
          >
            <h2>{headline}</h2>
          </div>
          {items.map((bubble, ind) => {
            const { image, analytics } = bubble;

            return (
              <div
                key={ind}
                className={`col-4 ${
                  clpPage ? "col-md-3" : "col-sm-3 col-md-5c"
                }`}
              >
                <a
                  href={image.href}
                  data-gtm-id={analytics.data_gtm_id}
                  data-gtm-position={analytics.data_gtm_position}
                  data-gtm-name={analytics.data_gtm_name}
                  data-gtm-creative={analytics.data_gtm_creative}
                  className={`d-flex flex-column${
                    !analytics.hpPlacement
                      ? " plp-espot-gtm-tag plp-espot-gtm-view"
                      : " hp-espot-gtm-tag hp-espot-gtm-view"
                  }`}
                >
                  <div className="category_item d-flex p-0">
                    <img
                      src={image.imageDesktop}
                      className="d-block w-100"
                      alt={image.imageAlt}
                    />
                  </div>
                  {image.body && (
                    <h3
                      className="p-2 pt-3"
                      dangerouslySetInnerHTML={{ __html: image.body }}
                    />
                  )}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
