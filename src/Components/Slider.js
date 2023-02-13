import { setIndexConfiguration } from "firebase/firestore";
import React,{ useState , useEffect} from "react";
import { AiOutlineLeft,AiOutlineRight } from 'react-icons/ai'
import './Slider.scss'
//https://webaura.tistory.com/entry/React-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%97%86%EC%9D%B4-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%8D%94-%EB%A7%8C%EB%93%A4%EA%B8%B0
const Slider = () => {
    const [fileUrl, setFileUrl] = useState([]);
    const arr  = ["../assets/grid.png","../assets/grid_1.png","../assets/grid_2.png"];
    useEffect(()=>{
        setFileUrl(arr)
    },[]);

    return(
        <>
            <div className="Slider-wrapper">
                <div className="Slider-view">
                    <div className="Slider-item">
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Slider;
