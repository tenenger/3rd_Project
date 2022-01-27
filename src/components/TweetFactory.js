import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import { v4 } from "uuid";
import TwetFactory from "./css/TweetFactory.module.css";
import { SvgImage } from "./Svgfile";

function TweetFactory({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [File, setFile] = useState("");
  const fileInput = useRef();
  const onSubmit = async (event) => {
    event.preventDefault();
    let FileURL = "";
    if (File !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, File, "data_url");
      FileURL = await getDownloadURL(response.ref);
    }
    const content = {
      text: tweet,
      created: Date.now(),
      creatorId: userObj.uid,
      FileURL,
    };
    await addDoc(collection(dbService, "tweets"), content);
    setTweet("");
    setFile("");
    fileInput.current.value = null;
  };
  const onChange = (event) => {
    const { value } = event.target;
    setTweet(value);
  };
  const onFileChange = (event) => {
    const { files } = event.target;
    const myFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(myFile);
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setFile(result);
    };
  };
  const onFileClear = () => {
    setFile("");
    fileInput.current.value = null;
  };
  return (
    <form onSubmit={onSubmit} action="" className={TwetFactory.outer}>
      <h3>한마디하기</h3>
      <textarea
        type="text"
        placeholder="글을 적어서 오늘 생긴 일을 표현하세요"
        maxLength={120}
        value={tweet}
        onChange={onChange}
        className={TwetFactory.textinput}
      />
      <div className={TwetFactory.click}>
        <div>
          <label className={TwetFactory.fileinput}>
            <SvgImage />
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
        {File && (
          <div className={TwetFactory.ImagePreview}>
            <img src={File} alt="" width="50px" height="50px" />
            <button
              className={TwetFactory.ImageCancelbtn}
              onClick={onFileClear}
            >
              취소
            </button>
          </div>
        )}
        <div>
          <input
            value="트윗남기기"
            type="submit"
            className={TwetFactory.submit}
          />
        </div>
      </div>
    </form>
  );
}
export default TweetFactory;
