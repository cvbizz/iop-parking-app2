import React, { useEffect, useState,useRef } from 'react';
import { View, Share, Button, ActivityIndicator, Text,SafeAreaView,ScrollView,SectionList,FlatList,ImageBackground,Image,StyleSheet,TouchableOpacity, Linking,TextInput,Pressable} from 'react-native';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import {Platform} from 'react-native';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import { List, Checkbox } from 'react-native-paper';
import { useLayoutEffect } from 'react';
import { useCallback } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ButtonGroup } from 'react-native-elements';
import { NavigationContainer,useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { WebView } from 'expo-web-view';
import { WebView } from 'react-native-webview';

import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from './assets/new_logo.png'; 
import logoSmall from './assets/icon-small.png'; 
import insideTop from './assets/inside2.png'; 
import logoS from './assets/folly_park_logo.png'; 

import bgs7 from './assets/bgs/app_bg.jpg';
import bestOpt from './assets/best_options.png'; 
import redImage from './assets/red.png';
import yellowImage from './assets/yellow.png';
import greenImage from './assets/green.png';
import directionsBTN from './assets/dir_sm.png'; 
import payMe from './assets/pay_sm.png';
import lmore from './assets/learnmore.png'; 

//const Drawer = createDrawerNavigator();
///scale font protection
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1; // the maximum amount the font size will scale.
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1; // the maximum amount the font size will scale.


const images= [
  bgs7
  ];

global.myR = 4;

global.loggedIn = false; 
global.webPage = ''; 

const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Here\'s Where I am Parking on IOP:' + webPage,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  ///list of links///
function TheLineup({ navigation }) {
const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
const [shouldShow, setShouldShow] = useState(false);
const [bannerImage, setBannerImage] = useState(null);
const [bannerLink, setBannerLink] = useState(null);
///get the userid from login if presentscanne

 //setWelcome("SpringSkunk Music Fest\nMay 12-14, 2022")

   const getMovies = async () => {
     //value5 = await AsyncStorage.getItem('@storage_UID')
     
     try {
      const response = await fetch(`https://www.folly-app.com/_iop_app/link_list.cfm`)
   
      
      const json = await response.json();
      setData(json.buttons);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

 

    useEffect(() => {
    getMovies();
    
  }, []);

  // Fetch banner data only once
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch('https://www.folly-app.com/_iop_app/home_ads.cfm?ss');
        const json = await response.json();
        if (json.buttons && json.buttons.length > 0) {
          setBannerImage(json.buttons[0].image_url);
          setBannerLink(json.buttons[0].image_link);
          setalertBtn(json.buttons[0].alertStatus);
          //alert(json.buttons[0].alertStatus);
        }
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBannerData();
  }, []);

const twoOptionAlertHandler = (id,webPage) => {
    //alert(webPage)
     navigation.navigate('ass',{webURL:webPage})
    }

    const bannerClick = (id) => {
    navigation.navigate('ass', { webURL: id });
  };

  return (
   <View
      style={{
        flex: 1,
      }}>
      
          <SafeAreaView style={{ flex: 1, backgroundColor: '#eeeee9' }}>
      <ImageBackground style={{ flex: 1 }} source={images[1]}>
        <Image source={logoS} style={styles.logoL} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0, marginTop: 1, marginLeft: 5, marginRight: 5 }}>
        
        <View style={{ flex: 1, padding: 2, width: '100%', height: '80%' }}>
         <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 15, marginBottom:10, color:'#374183' }}>Helpful Links</Text>
          {isLoading ? <ActivityIndicator /> : (
            <FlatList 
          style={styles.homeListLinks}
        numColumns={1}
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
           <View style={{ flex: 1, flexDirection: 'column' }}>
  <TouchableOpacity onPress={() => twoOptionAlertHandler(1, item.drawerLink)}>
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      {/* Image */}
      <Image
        style={{ width: 105, height: 105, marginRight: 22, marginLeft: 5, backgroundColor: '#fff' }}
        source={{ uri: item.linkImage }}
      />
      
      {/* Title and Icon */}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', height: 112 }}>
        {/* Drawer Title */}
        <Text style={{
          color: '374183', 
          marginTop: 1,  // 20px from top
          marginLeft: 10, // Shift title to the right
          fontWeight: 'bold', 
          fontSize: 18
        }}>
          {item.drawer_title}
        </Text>

        {/* Clickable Icon */}
        <TouchableOpacity onPress={() => twoOptionAlertHandler(1, item.drawerLink)} style={{ position: 'absolute', right: 22 }}>
          <Image
            source={{ uri: 'https://folly-app.com/click.png' }} 
            style={{ width: 34, height: 34 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>

  {/* Divider */}
  <View style={{ height: 1, backgroundColor: '#999', marginTop: 5 }}></View>
</View>
          )}
        />
          )}
        </View></View>
        {bannerImage && (
          <TouchableOpacity onPress={() => bannerClick(bannerLink)} style={styles.bannerContainer}>
            <Image
              source={{ uri: bannerImage }}
              style={{ width: '100%', height: 120, marginTop: 0, marginBottom:0, resizeMode: 'contain', marginBottom: -5, backgroundColor: '#ffffff' }}
            />
          </TouchableOpacity>
        )}
      </ImageBackground>
    </SafeAreaView>
    </View>
  );
}

///videssso///
function TheAss2({ route, navigation }) {
  const { webURL } = route.params; 
  const [loading, setLoading] = useState(true); 
  const webviewRef = useRef(null);

  // Handle navigation state changes
  const handleNavigationStateChange = (navState) => {
    setLoading(navState.loading); // Dynamically set loading state
  };

  // Handle back button press
  const handleBackPress = () => {
    if (webviewRef.current && webviewRef.current.canGoBack) {
      webviewRef.current.goBack(); // Go back in WebView history
    } else {
      navigation.goBack(); // Navigate to the previous screen
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Back Button Header */}
      <View style={{ width: '100%', backgroundColor: '#000000' }}>
        <TouchableOpacity onPress={handleBackPress} style={{ padding: 10 }}>
          <Text style={{ color: '#ffffff', textAlign: 'center' }}>{"<< Back"}</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: -25 }, { translateY: -25 }],
          }}
        />
      )}

      {/* WebView */}
      <WebView
        source={{ uri: webURL }}
        originWhitelist={['https://*', '*', 'git://*']}
        ref={webviewRef}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        style={{ flex: 1 }}
        onShouldStartLoadWithRequest={(request) => {
          // Intercept 'tel:' and 'sms:' links to handle externally
          if (request.url.startsWith('tel:') || request.url.startsWith('sms:')) {
            Linking.openURL(request.url);
            return false;
          }
          return true;
        }}
      />
    </View>
  );
}


///parks list///
function TheAss2p({ navigation }) {
const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);


///get the userid from login if present

 //setWelcome("SpringSkunk Music Fest\nMay 12-14, 2022")

  const getMovies = async () => {
    
     try {
       const value5 = await AsyncStorage.getItem('@storage_UID')
      const response = await fetch('https://www.ionevents.net/parkhop-2022/parks.cfm?userID=9vs2d9');
      
      const json = await response.json();
      setData(json.buttons);
       //setWelcome("SpringSkunk Music Fest\nMay 12-14, 2022")
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
     //setWelcome("SpringSkunk Music Fest\nMay 12-14, 2022")
  }, []);

  

  

const twoOptionAlertHandler = (id,webPage) => {
    //alert(webPage)
     navigation.navigate('Details',{webURL:webPage})
    }

  return (
    <View
      style={{
        flex: 1,
      }}>
      
      <SafeAreaView style={{flex: 1,backgroundColor: 'black'}}>
    <ImageBackground
style={{flex: 1}}
source={images[myR]}>
    <Image source={logoS} style={styles.logoL} />
    <View style={{ flex: 1, padding: 2, width:'100%'}}>
    
     <Text style={styles.titleText}>Parks</Text>
    
      {isLoading ? <ActivityIndicator/> : (
         <FlatList 
          style={styles.homeList}
        numColumns={1}
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
           <View style={{flex:1, flexDirection:'column'}}>
            <TouchableOpacity onPress={() => twoOptionAlertHandler(1, item.vidUrl)} >
            <View style={{flex:1, flexDirection:'row'}}>
            <Image style={{width:125, height:125, marginRight:12,marginLeft:5, backgroundColor:'#fff'}} source={{ uri: item.vidImage }} />
            <View style={{flex:1, flexDirection:'column', height:112}}>
            <Text style={{color:'#fff',marginTop:'10%', fontWeight:'bold',fontSize:18}}>{item.vidName}</Text>
            </View>
            </View></TouchableOpacity>
            <View style={{height:1, backgroundColor:'#fff', marginTop:5}}></View>
            </View>
          )}
        />
      )}
     
    </View>  
    </ImageBackground>
    </SafeAreaView>
    </View>
  );
}




function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerLink, setBannerLink] = useState(null);
  const [alertBtn, setalertBtn] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  const requestTrackingPermission = async () => {
    if (Platform.OS === 'ios') {
      setTimeout(async () => {
        const { granted } = await requestTrackingPermissionsAsync();
        if (!granted) {
          Alert.alert("Permission Blocked", "You have blocked tracking, which might limit some functionality.");
        }
      }, 800);
    }
  };

  const getReportsData = useCallback(async () => {
    try {
      const response = await fetch('https://www.folly-app.com/_iop_app/parking_data.cfm?cv=aaasdf');
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.indexOf("application/json") !== -1) {
        const json = await response.json();
        if (json && Array.isArray(json)) {
          setData(json);
          setCurrentDateTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        } else {
          console.warn("No valid data returned.");
        }
      } else {
        throw new Error("Response is not JSON");
      }
    } catch (error) {
      console.error("Error fetching reports or no data:", error);
      setTimeout(() => {
        getReportsData();
      }, 5000); // Retry after 5 seconds
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch banner data only once
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch('https://www.folly-app.com/_iop_app/home_ads.cfm?s88s');
        const json = await response.json();
        if (json.buttons && json.buttons.length > 0) {
          setBannerImage(json.buttons[0].image_url);
          setBannerLink(json.buttons[0].image_link);
          setalertBtn(json.buttons[0].alertStatus);
          //alert(json.buttons[0].alertStatus);
        }
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBannerData();
  }, []);

  // Fetch reports data periodically
  useEffect(() => {
    getReportsData();
    const intervalId = setInterval(() => {
      getReportsData();
    }, 180000); // 3 minutes = 180,000 ms

    return () => clearInterval(intervalId);
  }, [getReportsData]);

  useEffect(() => {
    const permissionTimeout = setTimeout(() => {
      requestTrackingPermission();
    }, 900);

    return () => clearTimeout(permissionTimeout); // Clear timeout on unmount
  }, []);

  const bannerClick = (id) => {
    navigation.navigate('ass', { webURL: id });
  };

  const callUs = () => {
    Linking.openURL('tel:8438856505');
  };

  const renderItem = ({ item }) => {
    const percentage = (item.data.counter / item.capacity) * 100;

    let imageSource;
   if (isNaN(percentage)) {
  imageSource = redImage; // Show redImage if calculation results in NaN
} else if (percentage > 75) {
  imageSource = redImage;
} else if (percentage > 49) {
  imageSource = yellowImage;
} else {
  imageSource = greenImage;
}

    return (
      <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ width: '100%' }}
          onPress={() => navigation.navigate('Details', { 
            name: item.name, 
            lat: item.lat, 
            lon: item.lon, 
            payLink: item.payLink, 
            taken: percentage.toFixed(0)
          })}
        >
          <View style={{ paddingRight: 50 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name.split(' Occupancy')[0] + ' '}</Text>
          
  
  {!isNaN(percentage) && (
  <Text>Spaces Taken: {item.data.counter}</Text>
)}

{!isNaN(percentage) && (
  <Text>Lot Capacity: {item.capacity}</Text>
)}
            
            {!isNaN(percentage) && (
  <Text>Percent Taken: {percentage > 100 ? '>100' : percentage.toFixed(0)}%</Text>
)}
{isNaN(percentage) && (
  <Text style={{ marginBottom:30, backgroundColor: '#eeeee9', fontWeight: 'bold' }}>{item.capacity}</Text>
)}

          </View>
          <Image
  style={[
    styles.imageThumbnail,
    { 
      position: 'absolute', 
      right: 8, 
      top: '50%', 
      transform: [{ translateY: -25 }],
      marginTop: isNaN(percentage) ? -24 : -12 // Adds 20px bottom margin if percentage is NaN
    }
  ]}
  source={imageSource}
/>

        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eeeee9' }}>
      <ImageBackground style={{ flex: 1 }} source={images[1]}>
        <Image source={logoS} style={styles.logoL} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, marginTop: 75, marginLeft: 5, marginRight: 5 }}>
          <TouchableOpacity onPress={() => navigation.navigate('ass', { webURL: 'https://www.folly-app.com/_iop_app/traffic_support.cfm' })}  style={{ backgroundColor: '#020266', padding: 6, width: 125 }}>
            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Support</Text>
          </TouchableOpacity>
           {/* Conditional rendering based on AlertStatus */}
  {alertBtn > 0 && (
    <TouchableOpacity 
  onPress={() => navigation.navigate('ass', { webURL: 'https://www.folly-app.com/_iop_app/traffic_alerts.cfm?s3sd' })} 
  style={{ backgroundColor: 'red', padding: 6, width: 125 }}>
  <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Traffic Alerts</Text>
</TouchableOpacity>
  )}
          <TouchableOpacity style={{ backgroundColor: '#020266', padding: 6, width: 125 }} onPress={() =>  navigation.navigate('HelpfulLinks')}>
            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Helpful Links</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}>Available Parking as of {currentDateTime}</Text>
        <View style={{ flex: 1, padding: 2, width: '100%', height: '80%' }}>
          {isLoading ? <ActivityIndicator /> : (
            <FlatList
              style={styles.homeList}
              numColumns={1}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          )}
        </View>
        {bannerImage && (
          <TouchableOpacity onPress={() => bannerClick(bannerLink)}>
            <Image
              source={{ uri: bannerImage }}
              style={{ width: '100%', height: 120, marginTop: 0, resizeMode: 'contain', marginBottom: -5, backgroundColor: '#ffffff' }}
            />
          </TouchableOpacity>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

function DetailsScreen({ route, navigation }) {
  const { name, lat, lon, taken,payLink } = route.params;
  const [userLat, setUserLat] = useState(null);
  const [userLon, setUserLon] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: lat, // Passed from route
    longitude: lon, // Passed from route
    latitudeDelta: 0.006,
    longitudeDelta: 0.006,
  });
  const fullPayLink = `https://www.folly-app.com/_iop_app/pay-page.php?payLink=${payLink}&userLat=${userLat}&userLon=${userLon}&locationLat=${lat}&locationLon=${lon}`;

  const hasPayLink =
  typeof payLink === 'string' &&
  payLink.trim() !== '' &&
  payLink.toUpperCase() !== 'NULL';

  useEffect(() => {
  let locationSubscription;
  
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    locationSubscription = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
      (location) => {
        const { latitude, longitude } = location.coords;

        // Store the new values for userLat and userLon
        setUserLocation({
          latitude: latitude,
          longitude: longitude,
        });

        // Optionally, store lat/lon as separate variables if needed
        setUserLat(latitude);
        setUserLon(longitude);
      }
    );
  })();

  // Cleanup on component unmount
  return () => {
    if (locationSubscription) {
      locationSubscription.remove();
    }
  };
}, []);



  const getDirections = (destinationCoords, userLocationCoords) => {
  try {
    if (!userLocationCoords) {
      const destination = `${destinationCoords.latitude},${destinationCoords.longitude}`;
      const origin = '32.6575959,-79.942373'; // Default origin
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
      Linking.openURL(url);
      return;  // Return early if user location is not available
    }

    const destination = `${destinationCoords.latitude},${destinationCoords.longitude}`;
    const origin = `${userLocationCoords.latitude},${userLocationCoords.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    Linking.openURL(url);
  } catch (error) {
    console.error("Error opening directions:", error);
    Alert.alert("Error opening directions. Please try again.");
  }
};

//see if close enough to pay
const handlePress = (payLink, userLat, userLon, lat, lon, navigation) => {
  
  navigation.navigate('ass', { 
    webURL: fullPayLink, 
    userLat: userLat, 
    userLon: userLon, 
    locationLat: lat, 
    locationLon: lon 
  });
};



//

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <ImageBackground style={{ flex: 1 }} source={images[1]}>
          <Image source={logoS} style={styles.logoL} />

          <Text style={styles.titleTextMap}>{name.split(' Occupancy')[0]}</Text>
          {
  isNaN(taken) ? (
    <Text style={styles.titleTextC}>Lot Closed</Text>
  ) : (
    <Text style={styles.titleTextC}>Spaces Taken: {taken}%</Text>
  )
}

          <MapView
            style={{ flex: 1, height: '90%' }}
            region={coordinates}
            showsUserLocation={true}
          >
            <Marker
              coordinate={coordinates}
              title={name}
               description={isNaN(taken) ? 'Lot Closed' : `Percent Full: ${taken}%`}
            />
          </MapView>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 0, height:'11%',backgroundColor: '#ffffff' }}>
  <TouchableOpacity
    style={{
      width: '48%',
       // Set the minimum height to 180 pixels
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    }}
    onPress={() => getDirections(coordinates, userLocation)}
  >
    <Image
      source={directionsBTN}
      style={{
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      }}
    />
  </TouchableOpacity>


{hasPayLink && (
   <TouchableOpacity
    style={{
      width: '48%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    }}
    onPress={() => handlePress(payLink, userLat, userLon, lat, lon, navigation)}
  >
    <Image
      source={payMe}
      style={{
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      }}
    />
	</TouchableOpacity>
  )}
</View>


        </ImageBackground>
      </SafeAreaView>
    </View>
  );
}


const Stack = createNativeStackNavigator();

function CustomHeader({ navigation }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flex: 1, paddingRight: 15 }}>
  <TouchableOpacity style={{ backgroundColor: '#020266', padding: 6, width:125  }} onPress={() => navigation.openDrawer()}>
    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Helpful Links</Text>
  </TouchableOpacity>
</View>
  );
}

function CustomHeader2({ navigation }) {
  const callUs = () => {
    Linking.openURL('tel:8438856505');
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingLeft: 15}}>
      <TouchableOpacity onPress={callUs} style={{ backgroundColor: '#020266', padding: 6,width:125 }}>
        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Call Us</Text>
      </TouchableOpacity>
    </View>
  );
}
// Stack navigator for Home and Details
function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: '', headerShown: false }} 
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Lot Details',
          headerRight: () => (
            <Button
              onPress={onShare}
              title="Share"
              color="#000"
            />
          ),
        }}
      />
      <Stack.Screen
        name="HelpfulLinks"
        component={TheLineup}
        options={{
          title: '',
        }}
      />
      <Stack.Screen 
        name="ass" 
        component={TheAss2} 
        options={({ navigation }) => ({
          title: '',  // Add a title for the screen
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}  // Go back to the previous screen
              title="Back"
              color="#000"
            />
          ),
          
        })}
      />
    </Stack.Navigator>
  );
}


function App() {
  const [drawerData, setDrawerData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the JSON data once when the app first loads
  useEffect(() => {
    const fetchDrawerData = async () => {
      try {
        const response = await fetch('https://www.folly-app.com/_iop_app/folly_drawers.cfm');
        const data = await response.json();
        setDrawerData(data.buttons); // Assuming buttons is the array of drawer items
        setLoading(false);
      } catch (error) {
        console.error('Error fetching drawer data:', error);
        setLoading(false);
      }
    };

    fetchDrawerData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  
return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          headerStyle: { backgroundColor: '#020266' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Static Home Screen */}
       <Stack.Screen 
          name="HomeStack" 
          component={HomeStackNavigator} 
          options={{ headerShown: false }} 
        />

        {/* Dynamically generate Stack Screens based on JSON data */}
        {drawerData.map((item, index) => (
          <Stack.Screen 
            key={index} 
            name={item.drawer_title} 
            component={TheAss2} 
            initialParams={{ webURL: item.drawer_link }} 
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 50,
 backgroundColor: '#000',
 fontFamily: 'Nexa'
  },
MainContainer2: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#000',
 fontFamily: 'Nexa',
 width:'100%',
overflowY: 'scroll'
  },
  logo: {
    width: 175,
    marginTop: 0,
    justifyContent: 'center',
marginBottom:5,
  },
logoInner: {
    height: 100,
resizeMode: 'contain',
marginLeft: 15,
    marginTop: 2,
    justifyContent: 'left',
marginBottom:0,
  },
logoL: {
    width:'108%',
marginLeft:'0%',
marginRight:'0%',
    marginTop: -12,
marginBottom:-54,
resizeMode: 'contain',
backgroundColor:'#ffffff',
    
  },
direct: {
    width:'100%',
padding:'15',
marginLeft:'0%',
marginRight:'0%',
    marginTop:0,
marginBottom:0,
resizeMode: 'contain',
backgroundColor:'#00bf63',
    
  },
homeList: { 
marginTop:1,
backgroundColor:'#F2F3F5' ,
borderRadius: 1,
width:'100%',
marginLeft:'0%',
height:'65%',

},
homeListLinks: { 
marginTop:1,
backgroundColor:'#ffffff' ,
borderRadius: 1,
width:'100%',
marginLeft:'0%',
height:'99%',

},
peachList: { 
marginTop:1,
backgroundColor:'rgba(0,0,0,.4)' ,
borderRadius: 18,
width:'98%',


},
homeListx: { 
marginTop:11,
backgroundColor:'rgba(0,0,0,.4)' ,
borderRadius: 18,


},
skillList: {
  justifyContent: 'center',
height:78,
flexGrow:1,
width:'100%',
},
assList: {
  marginTop:5,
},
listText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop:12,
  },
asslistText: {
    color: '#fff',
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop:12,
  },
asslistText2: {
    color: '#fff',
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop:12,
  },
welcomeText: {
    color: '#fff',
fontSize:18,
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft:14,
    marginTop:106,
    marginBottom:12,
    width:"81%",
    padding:5,
  },
listText2: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#eeeee9',
    borderColor:'black', padding:12,
  },
listText3: {
    color: '#fff',
    textAlign: 'left',
    fontWeight: 'bold',
    width:'48%',
  },
  bannerAd: {
    marginTop:8,
    width:'100%',
    marginBottom:5,
    marginleft: 0,
    justifyContent: 'center',
    backgroundColor: 'white',
    resizeMode: 'contain',

  },
buttonD: {
    alignItems: 'center',
    backgroundColor: '#020266',
    width: '100%',
    height: 88,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    margin: 0,
    color:'white'
  },
button: {
    alignItems: 'center',
    backgroundColor: 'green',
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    margin: 10,
    marginLeft:'20%',
    color:'white'
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#8B0000',
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#99c',
    borderRadius: 5,
    margin: 10,
    marginLeft:'20%',
  },
  buttonText2:{
    
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
   buttonText2P:{
    
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
  },
  buttonText3:{
    
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  imageThumbnail: {
  position: 'absolute', right: 8, top: '30%',
  marginBottom:15,
    justifyContent: 'right',
    alignItems: 'left',
    height: 100,
 resizeMode: 'contain',
  },
 imageThumbnailV: {
    alignItems: 'center',
    height: 100,
 borderRadius: 15 / 2,
 resizeMode: 'contain',
 float:'left',
 margin:12,
 width:'40%',

  },
input: {
    width: 200,
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    margin: 10,
    color:'#000',
     marginLeft:'20%',
  
  },
  formcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    margin:12,
  
  },
  formcontainer2: {
    flex: 1,
    flexDirection: 'row',
  
    backgroundColor: 'black',
    margin:12,
    justifyContent: 'space-between',
  },
  formcontainer3: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    marginBottom:305,
    margingTop:12, marginLeft:12,
  
  },
  formcontainer5: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    marginBottom:305,
    margingTop:18, 
  
    borderTopColor: '#fff',
    borderTopWidth:1
  },
  input4: {
  backgroundColor: '#eeeee9',
    width: '40%',
    height: 40,
    fontSize: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: '#99c',
    margin: 3,
    color:'#000',
  
  },
  buttonText:{
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
  },
  buttonText6:{
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    color:'#fff'
  },
  button6:{
    width:134,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:11,
    backgroundColor:'#999',
    borderColor:'#fff'
  },
    buttonScan:{
    color:'#fff',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:'10%',
    marginRight:'10%',
    backgroundColor:'#339933',
    borderColor:'#fff',
    padding:10
  },
  titleText:{
    fontSize: 30,
    color:'#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:34,
    backgroundColor:'rgba(0,0,0,.4)' ,
    paddingLeft:20,
    width:'100%'
  },
  titleTextMap:{
    fontSize: 30,
    color:'#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:54,
    backgroundColor:'rgba(0,0,0,.4)' ,
    paddingLeft:20,
    width:'100%'
  },
  titleTextC:{
    fontSize: 30,
    color:'#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:4,
    backgroundColor:'white' ,
    paddingLeft:20,
    width:'100%'
  },
  subtitleView: {
   
    paddingLeft: 0,
    paddingTop: 0,
    backgroundColor:'#eeeee9'
  },
  myScanner:{
 height:'40%',
    width:'80%',
    marginLeft:'10%',
    marginRight:'10%'
  },
  titleTextInside:{
    fontSize: 30,
    color:'#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:-33,
    backgroundColor:'rgba(0,0,0,.4)' ,
    paddingLeft:20,
    width:'78%'
  },
  bannerContainer: {
    position: 'absolute',
    bottom: 0,  // Fix the banner to the bottom
    width: '100%',
    backgroundColor: '#ffffff',
  },
   besty:{
     backgroundColor: '#eeeee9',
     paddingLeft:0,
     marginLeft:'0%',
     height:95,
     resizeMode:'contain'
    
   },
    webView: {
    flex: 1,
  },
});

export default App;