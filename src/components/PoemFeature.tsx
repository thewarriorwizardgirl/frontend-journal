import React from "react";

export default function PoemFeature() {
  return (
    <section className="poetry-feature" aria-label="A poem by Manu">
      <div className="poetry-feature-copy">
        <h2 className="poem-title">Somewhere Sometime</h2>
        <blockquote className="poem-lines">
          <span className="poem-quote poem-quote-open" aria-hidden="true">
            “
          </span>
          <p>
            I write when I am happy .. to record that happiness ..
            <br />
            So that I can relive those moments .. whenever I wish to visit them
            again ..
          </p>
          <p>
            I write when I am sad .. to dump that sadness in pages ..
            <br />
            And to free my heart and mind .. And never really read that again ..
          </p>
          <p>
            I treasure everything in life .. so, I like to write ..
            <br />
            About people and things that touched me.. somewhere sometime ..
          </p>
          <span className="poem-quote poem-quote-close" aria-hidden="true">
            ”
          </span>
        </blockquote>
        <cite className="poem-attribution">~ Manu</cite>
      </div>
    </section>
  );
}
