import React from 'react';
import { View,Text,TouchableOpacity,ImageBackground } from 'react-native';
import styled from 'styled-components/native';

const Card = styled.View`
flexDirection:collumn;
alignItems:left;
justifyContent:center;
`
const OrgInfo = styled.View`
flexDirection:row;
`
const ImagePost = styled.ImageBackground`
width:100%;
height:undefined;
aspectration:1;
`
const VoidSpace = styled.View`
height:180;
`
const Description = styled.Text`
color:#FFFFFF;
`

const Post = ({Event}) => {
    return (
        <Card>
            <TouchableOpacity>
                    <OrgInfo>
                        <Text>ORG Avatar</Text>
                        <Text>ORG Name</Text>
                    </OrgInfo>
            </TouchableOpacity>
            <TouchableOpacity>
                    <ImagePost src='https://secureservercdn.net/198.71.233.33/k4y.f04.myftpupload.com/wp-content/uploads/2017/03/shutterstock_199419065.jpeg?time=1649858503'>
                        <VoidSpace></VoidSpace>
                        <View>
                            <Description>this is description</Description>
                        </View>
                    </ImagePost>
            </TouchableOpacity>

            
        </Card>
    )
}

export default Post