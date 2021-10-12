import React, { useState, useRef, useEffect } from 'react';

export function useRefresh (callback, delay) {

    const savedCallback = useRef();

    // remember the latest callback
    useEffect(() => {

        savedCallback.current = callback;

    }, [callback]);

    // setup the interval
    useEffect(() => {

        function tick(){
            savedCallback.current();
        }

        if(delay !== null){

            let id = setInterval(tick, delay);
            return () => clearInterval(id);

        }

    }, [delay]);

}