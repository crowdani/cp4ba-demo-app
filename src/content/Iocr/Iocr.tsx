
import React, { useState, useEffect,ChangeEvent } from "react";


import axios from 'axios';
import Viewer from "../../components/Viewer/Viewer";
import FileLoading from "../../components/Viewer/FileLoading"
import { Button, Column, FileUploader, Grid, Loading, Row } from "carbon-components-react";
import TreeView from "../../components/TreeView";
import TreeNode from './IocrTypes'
import { View } from "@carbon/icons-react";



function Iocr() {


    const treeData = [
        {
          "id": 12345678,
          "parentId": null,
          "label": "My parent node",
          
        }
      ]


    const [inputFile, setInputFile] = useState<HTMLInputElement | null>(null);
    const [theFile, setFile] = useState<File>();
    const [nlpData, setNLP] = useState<any>(treeData);
    const [processingState, setProcessingState] = useState<boolean>(false)
    const [url, setUrl] = React.useState('');

    useEffect(() => {
        setInputFile(document.getElementById("input-file") as HTMLInputElement);
    }, []);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files;
      setFile(e.target.files[0]);
      files.length > 0 && setUrl(URL.createObjectURL(files[0]));
    }
    
  };

    // Accepts the array and key
    const groupBy = (array:any, key:any) => {
        // Return the end result
        return array.reduce((result:any, currentValue:any) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
        }, {}); // empty object is the initial value for result object
    };

    const processOdm = (jsonData: any) =>{

      const data = {
        "__DecisionID__": "string",
        "options_in": "string",
        "iocr_in": { jsonData
        }
      }
        axios.post("/DecisionService/rest/Capture/ProcessIOCRDocument", data)
        .then((res) => {
            console.log(res)
            
        }
        
        )
    }

  const processFile = (event :any)=>{
    setProcessingState(true)
    const formData = new FormData();
    //formData.append("name", name);
    if(theFile!== undefined){
        formData.append("file", theFile);
    }
    axios.post("/ocr", formData)
    .then((res) => {
        const ocrData = res.data;
        processOdm(ocrData);

    })
  }

  const upload = (event: any) =>{
    
    setProcessingState(true)
    const formData = new FormData();
    //formData.append("name", name);
    if(theFile!== undefined){
        formData.append("file", theFile);
    }
    axios.post("/ocr/nlp", formData)
    .then((res) => {
        let treeData = [];
        
        console.log(res.data.entities);
        const entities = res.data.entities
        //const groupedData:any  = entities{`type`: type};
        const groupedData:any = groupBy(entities,"type")


        for(let x in groupedData){
            const typeDataObject = groupedData[x]

            let typeData:TreeNode = {"id":x,"label": x, "parentId": null, "items":[] }
          
            let dataArray = [];
            for(let y in typeDataObject){
                
            let someData = {
                "id": typeDataObject[y].text,
                "parentId": x,
                "label": typeDataObject[y].text,
              }
              dataArray.push(someData);
            }
            typeData.items = dataArray
            treeData.push(typeData)
        }
        console.log(treeData);
        setNLP(treeData);
        setProcessingState(false)
      
    })
  }


    return (
        <div className="results__wrapper">
                <div>
                <FileUploader
                accept={[
                    '.pdf'
        
                ]}
                buttonKind="primary"
                buttonLabel="Add files"
                filenameStatus="edit"
                iconDescription="Clear file"
                labelDescription="only .jpg files at 500mb or less"
                labelTitle="Upload"
                onChange={handleFileChange}
                />
                {processingState ? (
                    <Loading description="Active loading indicator" withOverlay={false} />
                ): (
                    <Button onClick={upload} className="btn btn-outline-primary">Process Document</Button>

                )}
           </div>
            <div className="viewer__view">
            {processingState ? (
                <FileLoading></FileLoading>
                ): (
                <Viewer pdfUrl={url}></Viewer>
                )}
            </div>
   
                <TreeView nlpData={nlpData}></TreeView>
        
    </div>
        


        )

}
export default Iocr;
export{}