import React from "react";

function Footer() {
    const links = [
        {name: "Portfolio",url: "https://zineddinebtc.github.io/my-portfolio"},
        {name: "Facebook",url: "https://www.facebook.com/zineddine.bettouche"},
        {name: "Twitter",url: "https://www.twitter.com/ZineddineBtc"},
        {name: "LinkedIn",url: "https://www.linkedin.com/in/zneddine-bettouche"},
        {name: "Twitter",url: "https://www.twitter.com/ZineddineBtc"},
    ]
    return (
        <div id="div-footer">
            <footer id="footer">    
                <a className="socials-link" href="mailto:zineddine.bettouche.inbox@gmail.com">Gmail</a>
                {links.map((item, index)=>{
                    return <a key={index} className="socials-link" target="_blank" rel="noopener noreferrer" href={item.url}>{item.name}</a>
                })}
                <br/>
                <a className="socials-link" target="_blank" rel="noopener noreferrer" href="https://github.com/ZineddineBtc/Clound-Notes">
                    Source Code
                </a>
                
                <p id="copyright">© Copyright 2021 Zineddine Bettouche</p>
            </footer>
        </div>
    );
}

export default Footer;