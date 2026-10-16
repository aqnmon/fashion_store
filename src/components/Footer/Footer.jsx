import Logo from "../Logo/Logo";
import { InstagramIcon, FacebookIcon } from "../Icons/Icons";
import "./Footer.css";

function Footer({ copyrightText, socialLinks }) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo src="/Logo.png" alt="Fashion Store" width={48} height={48} />
          <p className="footer__copyright">{copyrightText}</p>
        </div>

        <div className="footer__socials">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="footer__social-link"
              aria-label={link.platform}
            >
              {link.platform === "Instagram" && <InstagramIcon size={20} />}
              {link.platform === "Facebook" && <FacebookIcon size={20} />}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;