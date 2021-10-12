import React, {useState} from 'react';
import Lottie from 'react-lottie';

import checkData from '../../_data/check-green.json'

const LottiePlayer = ({ lottieData, w, h, loop }) => {

    const [isStopped, SetIsStopped] = useState(false);
    const [isPaused, SetIsPaused] = useState(false); 

    const defaultOptions = {
        loop: loop ? true : false,
        autoplay: true, 
        animationData: lottieData ? lottieData : checkData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div>
            <Lottie 
                options={defaultOptions}
                height={h}
                width={w}
                isStopped={isStopped}
                isPaused={isPaused}/>
        </div>
    )

}

export default LottiePlayer;