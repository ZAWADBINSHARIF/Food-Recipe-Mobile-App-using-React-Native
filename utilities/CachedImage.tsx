import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';



const CachedImage = (props: any) => {

    const [cachedSource, setCachedSource] = useState<{ uri: string; }>();
    const { uri } = props;


    useEffect(() => {
        const getCachedImage = async () => {
            try {
                const cachedImageData = await AsyncStorage.getItem(uri);

                if (cachedImageData) {
                    setCachedSource({ uri: cachedImageData });
                } else {
                    const response = await fetch(uri);
                    const imageBlob = await response.blob();
                    const base64Data = await new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend = () => {
                            resolve(reader.result as string);
                        };
                    });
                    // console.log(typeof (base64Data));
                    await AsyncStorage.setItem(uri, base64Data);
                    setCachedSource({ uri: base64Data });
                }
            } catch (error) {
                console.log(error);
                setCachedSource({ uri });
            }
        };

        getCachedImage();

    }, [uri]);


    return <Animated.Image source={cachedSource} {...props} />;
};

export default CachedImage;