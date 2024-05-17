import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon } from 'react-native-heroicons/outline';

const home = () => {
    return (
        <View className='flex-1 bg-white'>


            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    'paddingBottom': 50
                }}
                className='space-y-6 pt-14'
            >

                <View className="mx-4 flex-row justify-between items-center mb-2">

                    <Image source={require('@/assets/images/avatar.png')} style={{ height: hp(5.5), width: hp(5) }} />
                    <BellIcon size={hp(4)} color='gray' />


                </View>

            </ScrollView>


            <StatusBar style='dark' />

        </View>
    );
};

export default home;