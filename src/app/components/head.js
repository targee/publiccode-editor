import React, { useEffect, useState } from "react";
import { repositoryUrl, privacyPolicyUrl } from "../contents/constants";
import moment from "moment";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

let timer = null;
let lastGen = null;

export const Head = (props) => {
  const [info, setInfo] = useState(null);
  const { t } = useTranslation();

  const updateGen = (lastGen) => {
    console.log("UPDATE GEN");
    let info = null;
    if (lastGen) {
      info = moment(lastGen).fromNow();
      timer = setTimeout(
        function() {
          updateGen(lastGen);
        }.bind(this),
        30000
      );
    }
    setInfo(info);
  };

  useEffect(() => {
    if (props.lastGen != lastGen) {
      if (timer) {
        clearTimeout(timer);
      }
      updateGen(props.lastGen);

      return () => {
        //unmount
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, props.lastGen);

  return (
    <div className="content__head">
      <div className="content__head__title">{t("editor.title")}</div>
      <div className="content__head__help">
        <div>
          <a
            className="pr-5"
            href={privacyPolicyUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("editor.privacypolicy")}
          </a>
          <a href={repositoryUrl} rel="noopener noreferrer" target="_blank">
          {t("editor.needhelp")}
          </a>
        </div>
        <div>
          {info && (
            <span className="content__head__status">
              {t("editor.lastgeneration")}: {info}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Head;
Head.propTypes = {
  lastGen: PropTypes.object.isRequired,
};
