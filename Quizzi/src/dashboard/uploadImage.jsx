import axios from "axios";
import { uploadFile } from "./uploadAction"
import { useRef, useState ,useEffect} from "react";
export default function UploadForm(props) {
    const [uploadedFile, setUploadedFile] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
          try {
          
            // Send request to the server or another API
            const res = await axios.get('https://localhost:3000/api/savequestion');
            console.log(res.data.message)
            if (res.data.message === 1){reloadThePage();};
          } catch (err) {
            console.error(err);
          } finally {
          }
        };
    
        fetchData();
      }, []);
    const reloadThePage = () => {
        window.location.reload();
    };
    useEffect(()=>{
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }else{
            if(uploadedFile){
                setUploadedFile(false);

                reloadThePage();

            }

        }
    },[uploadedFile])
    const formRef = useRef<HTMLFormElement>(null);

    const handleInputChange = (e: any) => {

        // Programmatically trigger form submission
        if (formRef.current) {

            formRef.current.requestSubmit();



        }
    };
    return (

        <form ref={formRef} action={(e)=>{uploadFile(e)}} className="flex flex-col gap-4 text-center">
            <label>
                <input onChange={handleInputChange} className="text-sm text-stone-500
   file:mr-5 file:py-1 file:px-3 file:border-[1px]
   file:text-xs file:font-medium
   file:rounded-md file:h-9 file:focus:outline-none file:focus:shadow-sm
   file:bg-red-50 file:text-stone-700
   
   hover:file:cursor-pointer hover:file:bg-blue-50
" type="file" name="file" />
            </label>
        </form>
    );
}