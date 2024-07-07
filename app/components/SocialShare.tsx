import {
  Twitter as TwitterIcon,
  Linkedin as LinkedinIcon,
  Facebook as FbIcon,
  // Mail as MailIcon,
} from "lucide-react";
import { IoMdMail as MailIcon } from "react-icons/io";
import {
  FaFacebookSquare,
  FaLinkedin
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

interface SocialShareType {
  url: string | false;
}

export const SocialShare = ({ url }: SocialShareType) => {
  const subject = "Check this out!"; // The subject of the email
  const body = `I thought you might be interested in this: ${url}`;
  const iconStyle =
    "text-2xl hover:text-black transition duration-500";
  return (
      <div className="flex gap-2 ">
        <a
          href={`https://twitter.com/intent/tweet?url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaSquareXTwitter className="social-icon" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookSquare className="social-icon" />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="social-icon" />
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(body)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MailIcon className="social-icon" />
        </a>
      </div>

  );
};
