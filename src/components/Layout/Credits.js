import React from 'react'

export default function Credits() {
    return (
        <div className="credits">
            <a href="https://github.com/ScotDev" className="credits__link" rel="noopener noreferrer" target="_blank"
            >Created by ScotDev <i className="credits_icon ri-github-fill"></i>
            </a>
            <span className="credits__not-link"> - powered by the </span>
            <a href="https://github.com/lindell/JsBarcode" className="credits__link" rel="noopener noreferrer" target="_blank"
            > JsBarcode library from Johan Lindell</a>
        </div>
    )
}
