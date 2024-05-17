import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { router } from 'expo-router';

const welcomeScreen = () => {

    const ring1Padding = useSharedValue(0);
    const ring2Padding = useSharedValue(0);

    useEffect(() => {

        ring1Padding.value = 0;
        ring2Padding.value = 0;

        setTimeout(() => ring1Padding.value = withSpring(ring1Padding.value + hp(5)), 100);
        setTimeout(() => ring2Padding.value = withSpring(ring2Padding.value + hp(5.5)), 300);

        setTimeout(() => router.push('/home'), 2000);
    }, []);

    return (
        <View className='flex-1 justify-center items-center space-y-10 bg-amber-500'>


            <Animated.View className=' bg-white/20 rounded-full' style={{ padding: ring2Padding }}>
                <Animated.View className=' bg-white/20 rounded-full' style={{ padding: ring1Padding }}>
                    <Image source={require('@/assets/food_imgs/hamburger.png')} style={{ width: 200, height: 200 }} />
                </Animated.View>
            </Animated.View>


            <View className='flex items-center space-y-2'>

                <Text style={{ fontSize: hp(7) }} className='font-bold text-white tracking-widest'>
                    Foody
                </Text>
                <Text style={{ fontSize: hp(2) }} className='font-medium text-white tracking-widest'>
                    Food is always right
                </Text>


            </View>


            <StatusBar style='light' />
        </View>
    );
};

export default welcomeScreen;