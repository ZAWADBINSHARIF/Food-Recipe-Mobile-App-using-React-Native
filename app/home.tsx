import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '@/components/Categories';

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


                <View className='mx-4 space-y-2 mb-2'>
                    <Text style={{ fontSize: hp(1.7) }} className='text-neutral-600'>Hello, ZAWAD</Text>
                    <Text style={{ fontSize: hp(3.8) }} className=' font-semibold text-neutral-600'>Make your own food,</Text>
                    <Text style={{ fontSize: hp(3.8) }} className=' font-semibold text-neutral-600'>stay at <Text className='text-amber-400'>home</Text></Text>
                </View>


                <View className='mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]'>
                    <TextInput
                        placeholder='Search any recipe'
                        placeholderTextColor={'gray'}
                        style={{ fontSize: hp(1.7) }}
                        className='flex-1 text-base mb-1 pl-3 tracking-wider'
                    />

                    <View className='bg-white rounded-full p-3'>
                        <MagnifyingGlassIcon size={hp(2.5)} color={'gray'} strokeWidth={3} />
                    </View>
                </View>



                <View>
                    <Categories />
                </View>



            </ScrollView>


            <StatusBar style='dark' />

        </View>
    );
};

export default home;