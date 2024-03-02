import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions/translateActions";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import Loader from "./components/Loader";
import { updateText } from "./redux/slices/translateSlice";

const App = () => {
  const [sourceLang, setSourceLang] = useState({
    value: "en",
    label: "English",
  });
  const [targetLang, setTargetLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [text, setText] = useState();

  //console.log(sourceLang);
  //console.log(targetLang);
  //console.log(text);

  const langState = useSelector((store) => store.language);
  const translateState = useSelector((store) => store.translate);
  //console.log(langState);
  //console.log(translateState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  //console.log(langState.languages); icindeki code ve name degerlerini const options daki value ve labele cevirmeliyim

  //elimizdeki bir diziyi formatlayip yeni bir dizi yapmak istiyorsak map kullanmaliyiz
  // bu islem sadece sayfa yenilendiginde bir defa calissin diye useMemo ile sarmaladik.
  const formatted = useMemo(
    () =>
      langState.languages?.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [langState.languages]
  );

  //console.log(langState.languages);

  const handleChange = () => {
    //select alanalrini degistirme
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    //text alanlarini degistirme
    setText(translateState.text);

    dispatch(updateText(text));
  };

  return (
    <div className="bg-zinc-900 h-screen text-white grid place-items-center">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className="text-center text-4xl font-semibold mb-7">
          Translator++
        </h1>

        {/* üst alan */}
        <div className="flex gap-2 text-black">
          <Select
            isLoading={langState.isLoading}
            isDisabled={langState.isLoading}
            value={sourceLang}
            onChange={setSourceLang}
            className="flex-1"
            options={formatted}
          />

          <button
            onClick={handleChange}
            className="rounded py-1 px-6 bg-zinc-700 text-white transition hover:ring-2 hover:bg-zinc-800 "
          >
            Changes
          </button>

          <Select
            isLoading={langState.isLoading}
            isDisabled={langState.isLoading}
            onChange={setTargetLang}
            className="flex-1"
            options={formatted}
            value={targetLang}
          />
        </div>

        {/* text alanları */}
        <div className="flex mt-5 gap-[105px] max-md:flex-col max-md:gap-3">
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black"
            />
          </div>

          <div className="relative flex-1">
            <textarea
              value={translateState.text}
              disabled
              className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded"
            />
            {/* todo */}
            {translateState.isLoading && <Loader />}
          </div>
        </div>

        {/* buton */}
        <button
          onClick={() =>
            dispatch(translateText({ sourceLang, targetLang, text }))
          }
          className="rounded-md py-3 px-5 text-[17px] font-semibold cursor-pointer bg-zinc-700 mt-3 hover:ring-2 hover:bg-zinc-900 transition"
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default App;
