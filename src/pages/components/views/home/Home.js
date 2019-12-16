import React from 'react'
import { View, Text,TouchableOpacity,ScrollView } from 'react-native'
// import { Card, Content as CardContent, Footer, Header, Video, Image, Map } from '../../components/card'
// import { Tabs } from '@ant-design/react-native'



const Home = props => {
    const tabs = [
        { title: 'First Tab' },
        { title: 'Second Tab' },
        { title: 'Third Tab' },
    ];

    return (
        <View style={{ flex: 1 }}>
            <Text>55555555555</Text>
            {/*<Tabs tabs={tabs}*/}
            {/*renderTabBar={tabProps => (*/}
                {/*<View*/}
                  {/*style={{*/}
                    {/*paddingHorizontal: 16,*/}
                    {/*flexDirection: 'row',*/}
                    {/*alignItems: 'center',*/}
                    {/*justifyContent: 'space-evenly',*/}
                  {/*}}*/}
                {/*>*/}
                    {/*<Text>照片</Text>*/}
                  {/*{tabProps.tabs.map((tab, i) => (*/}
                    {/*// change the style to fit your needs*/}
                    {/*<TouchableOpacity*/}
                      {/*activeOpacity={0.9}*/}
                      {/*key={tab.key || i}*/}
                      {/*style={{*/}
                        {/*// width: '30%',*/}
                        {/*padding: 6,*/}
                      {/*}}*/}
                      {/*onPress={() => {*/}
                        {/*const { goToTab, onTabClick } = tabProps;*/}
                        {/*// tslint:disable-next-line:no-unused-expression*/}
                        {/*onTabClick && onTabClick(tabs[i], i);*/}
                        {/*// tslint:disable-next-line:no-unused-expression*/}
                        {/*goToTab && goToTab(i);*/}
                      {/*}}*/}
                    {/*>*/}
                      {/*<Text*/}
                        {/*style={{*/}
                          {/*color: tabProps.activeTab === i ? 'green' : undefined,*/}
                        {/*}}*/}
                      {/*>*/}
                        {/*{tab.title}*/}
                      {/*</Text>*/}
                    {/*</TouchableOpacity>*/}
                  {/*))}*/}
                    {/*<Text>Menu</Text>*/}

                {/*</View>*/}
              {/*)}*/}
            {/*>*/}
                {/*<ScrollView style={{ flex: 1 }}>*/}
                    {/*<Card>*/}
                        {/*<Header />*/}
                        {/*<CardContent />*/}
                        {/*<Video />*/}
                        {/*<Footer />*/}
                    {/*</Card>*/}
                    {/*<Card>*/}
                        {/*<Header />*/}
                        {/*<CardContent />*/}
                        {/*<Image />*/}
                        {/*<Footer />*/}
                    {/*</Card>*/}
                    {/*<Card>*/}
                        {/*<Header />*/}
                        {/*<CardContent />*/}
                        {/*<Map />*/}
                        {/*<Footer />*/}
                    {/*</Card>*/}
                    {/*<Text>Content of Second Tab</Text>*/}
                {/*</ScrollView>*/}
                {/*<View >*/}
                    {/*<Text>Content of Second Tab</Text>*/}
                {/*</View>*/}
                {/*<View >*/}
                    {/*<Text>Content of Third Tab</Text>*/}
                {/*</View>*/}
            {/*</Tabs>*/}
        </View>
    )
}

export default Home
