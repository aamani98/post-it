import React from "react";

export default function Post({ img, title, summary }) {
  return (
    <article>
      <div className="post">
        <div className="post__img">
          <img
            src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*ES8Ny3D4nRt1FCxBOZ8Ulw.png"
            alt=""
          />
        </div>
        <div className="post__content">
          <h3>{title}</h3>
          <p>{summary}</p>
          <div className="post__content__readmore">
            <button>Read more...</button>
          </div>
        </div>
      </div>
      <div className="line"></div>
    </article>
  );
}
