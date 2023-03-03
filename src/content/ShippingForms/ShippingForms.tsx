
import {Button, Checkbox, Form,NumberInput,Select,SelectItem, Tile} from 'carbon-components-react';
import { shippingRequest,pricing } from './ShippingTypes';


import { useState } from 'react';
import { Label } from '@carbon/icons-react';



function ShippingForms() {

    const jsonData = {"Customer": "Bronze","__DecisionID__": "string",
    "Shipment": {   
          "weight": 0,
          "size": "Letter"
        },
    "Method": {
      "pickup": "Pickup",
      "transport": "Air",
      "nextDay": true
        },
    "Distance": 0
    }

 
    const[shippingRequest, setShippingRequest] = useState<shippingRequest>(jsonData)
    const[pricingObj, setPricing] = useState<pricing>({"__DecisionID__":"", Price:0.0})

    const verifySelected = (data: string) => {
        if(data==="placeholder-item" || data==="Choose an option" ){
            return false
        }
        return true;
    }

    //const handleChange = (event: { target: { id: any; value: any; }; }) => {
    const createForm = (data: HTMLFormControlsCollection) => {
              
        let chk: boolean = true;
        chk = verifySelected((data.namedItem("formCustomer") as HTMLInputElement).value)
        if(!chk){
            return false;
        }
        chk = verifySelected((data.namedItem("formShipmentSize") as HTMLInputElement).value)
        if(!chk){
            return false;
        }
        chk = verifySelected((data.namedItem("formMethodPickup") as HTMLInputElement).value)
        if(!chk){
            return false;
        }
        chk = verifySelected((data.namedItem("formMethodTransport") as HTMLInputElement).value)
        
        if(!chk){
            return false;
        }

        shippingRequest.Customer = (data.namedItem("formCustomer") as HTMLInputElement).value;
        shippingRequest.Shipment.weight = +(data.namedItem("formShipmentWeight") as HTMLInputElement).value
        shippingRequest.Shipment.size = (data.namedItem("formShipmentSize") as HTMLInputElement).value
        shippingRequest.Method.pickup = (data.namedItem("formMethodPickup") as HTMLInputElement).value
        shippingRequest.Method.transport = (data.namedItem("formMethodTransport") as HTMLInputElement).value
        shippingRequest.Method.nextDay = true;
        shippingRequest.Distance =+(data.namedItem("formMethodDistance") as HTMLInputElement).value

        console.log(shippingRequest)
        return true;
       
    };
    const handleSubmit =(e: any): void => {
        e.preventDefault()
        const verifyForm:boolean = createForm(e.currentTarget.elements)
        if(verifyForm){
            handleClick();
            
        }else{
            alert("Form bad");
        }
        
      }
   /*
        const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        
        console.log()
        //console.log(shippingRequest);

        //handleClick();
        }
    */
    const fetchPost = async (data: shippingRequest) => {
      let url: string = "/DecisionService/rest/Shipment_Pricing_RuleApp/Shipment_Pricing";
      const res = await fetch(url, {  // Enter your IP address here
        headers: {"Content-Type": "application/json"},
        method: 'POST', 
        mode: 'cors', 
        body: JSON.stringify(shippingRequest) // body data type must match "Content-Type" header
      })
      const json = await res.json();
      return json;
    }
    
  
    function handleClick() {
      fetchPost(shippingRequest).then(result =>{
        console.log(result.Price)
        setPricing({"__DecisionID__": "", "Price":result.Price})
      })

     

    }
    


  return (
    <div >
        <Tile id="1" style={{ marginBottom: '.5rem' }}>
         <Form onSubmit={handleSubmit} className="session__wrapper">
            
            <Select id="formCustomer" labelText="Customer Status" >
                <SelectItem text="Choose an option" value="placeholder-item" />
                <SelectItem text="Gold" value="Gold" />
                <SelectItem text="Silver" value="Silver" />
                <SelectItem text="Bronze" value="Bronze" />
            </Select>
            <NumberInput helperText="Enter Weight in KG"
                id="formShipmentWeight"
                invalidText="Number is not valid"
                label="Shipment Weight"
                max={10000}
                min={0}
                step={10}
                value={50}
               
            />
            <Select id="formShipmentSize" labelText="Shipment Size" >
                <SelectItem text="Choose an option" value="placeholder-item" />
                <SelectItem text="Letter" value="Letter" />
                <SelectItem text="Pack 1" value="Pack1" />
                <SelectItem text="Pack 2" value="Pack2" />
            </Select>
            <Select id="formMethodPickup" labelText="Pickup" >
                <SelectItem text="Choose an option" value="placeholder-item" />
                <SelectItem text="Pickup" value="Pickup" />
                <SelectItem text="Dropoff" value="Dropoff" />
            </Select>
            <Select id="formMethodTransport" labelText="Transport">
                <SelectItem text="Choose an option" value="placeholder-item" />
                <SelectItem text="Air" value="Air" />
                <SelectItem text="Ground" value="Ground" />
            </Select>
            <Checkbox labelText="Next Day label" id="formMethodNextDay" />
            <NumberInput helperText="Distance in KM"
                id="formMethodDistance"
                invalidText="Number is not valid"
                label="Distance"
                max={10000}
                min={0}
                step={10}
                value={50}
                
            />
             <Button type='submit'>
                Submit
            </Button>
            
         </Form>
         </Tile>
         <Tile>
         <div>
    
            Shipping Price {pricingObj.Price}
         </div>
         </Tile>
    </div>
   
  );
}
export default ShippingForms;
