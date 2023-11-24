import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React, { useState, useEffect } from 'react';
import './Tab1.css';
import { Storage } from '@ionic/storage';
import { Filesystem, Directory } from '@capacitor/filesystem';


const Tab1: React.FC = () => {

  const [receivedData, setReceivedData] = useState();
  const [src, setSRC] = useState();


  /////////////////////////////////////////////////////////////
  //////////////////Image Function/////////////////////////////
  // https://th.bing.com/th/id/OIP.HaO8exGeo5Q4uNMXuKPSdwHaEK?pid=ImgDet&rs=1
  const imageUrl2: string = "https://th.bing.com/th/id/OIP.-KIUZvogETrg4GQWIVJnkgHaEK?pid=ImgDet&w=1000&h=562&rs=1";

  //"maar als je alles cleart dan kan je geen niewe maken"
  // mocht je geen internet hebben dan is het 100% al opgeslagen, dan komt hij nooit bij de delete (.catch)

  const makeSource = (imageUrl: string) => {
    console.log('SET SOURCE: ', imageUrl2);
    const imageName = imageUrl.split('/').pop();
    const fileType = imageUrl?.split('.').pop();
    Filesystem.readFile({
      directory: Directory.Cache,
      path: 'CACHED-IMG/' + imageName
    }).then(readFile => {
      //Kijkt of er al een gecached is om te maken
      console.log('LOCAL FILE: ', readFile)
      const src: any = "data:image/" + fileType + ";base64," + readFile.data;
      setSRC(src)
    }).catch(async e => {
      //Clear voordat er een nieuwe cache komt, zodat er niet oude blijven staan
      ClearCache()
      //Als er geen is gecached cache de image
      await storeImage(imageUrl, imageName);
      Filesystem.readFile({
        directory: Directory.Cache,
        path: 'CACHED-IMG/' + imageName
      }).then(readFile => {
        const src: any = "data:image/" + fileType + ";base64," + readFile.data;
        setSRC(src)
      })
    });
  }

  const ClearCache = async () => {
    const fileEntries = await Filesystem.readdir({
      directory: Directory.Cache,
      path: 'CACHED-IMG'
    });

    fileEntries.files.map(async f => {
      // console.log('delete: ', f)
      await Filesystem.deleteFile({
        directory: Directory.Cache,
        path: 'CACHED-IMG/' + f.name
      });
    });
  }

  const convertBlobToBase64 = (blob: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  const storeImage = async (url: any, path: any) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const base64Data = await convertBlobToBase64(blob) as string;

    const savedFile = await Filesystem.writeFile({
      path: 'CACHED-IMG/' + path,
      data: base64Data,
      directory: Directory.Cache
    });
    return savedFile;
  }
  ///////////////////////////////
  /////// Get Stored Data ///////
  const obj = { name: "John Doew", age: 30 };
  const jsonString = JSON.stringify(obj);

  const store = new Storage();
  store.create();
  // Hoeft niet async of promise, want zodra de pagina inlaad komt nieuwe data.
  // Deze moet meteen opgeslagen worden.
  store.set('name', jsonString);

  useEffect(() => {
    const fetchData = async () => {
      const data = await store.get('name');
      setReceivedData(data);
    };

    fetchData();
  }, []);
  ///////////////////////////////

  /////// Image Function ////////
  useEffect(() => {
    if (src == null) {
      makeSource(imageUrl2);
    }
  }, [src]);
  ///////////////////////////////

  if (receivedData == null || src == null) {
    return null; // Or render a loading state
  }
  else {
    console.log(JSON.parse(receivedData));
  }



  // useEffect(() => {
  //   if (receivedData != null) {
  //     makeSource(imageUrl2);
  //   }
  // }, [receivedData]);

  //makes the src, maar kan ook <img> zijn I guess
  //of returns 'src' naar de makeImage function
  // makeSource(imageUrl2)

  // if (receivedData == null || src! == null) {
  //   return;
  // }

  // const CachedImage = (imageUrl: string) => {
  //   const [image, setImage] = useState(null);
  //   useEffect(() => {
  //     const loadImage = async () => {
  //       try {
  //         const response = await fetch(imageUrl);
  //         if (response.ok) {
  //           const blob = await response.blob();
  //           const objectURL: any = URL.createObjectURL(blob);
  //           setImage(objectURL);
  //         } else {
  //           console.error('Failed to fetch the image');
  //         }
  //       } catch (error) {
  //         console.error('Network error:', error);
  //       }
  //     };
  //     // Check if the image is not already loaded before fetching it
  //     if (!image) {
  //       loadImage();
  //     }
  //     // Clean up by revoking the object URL when the component unmounts
  //     return () => {
  //       if (image) {
  //         URL.revokeObjectURL(image);
  //       }
  //     };
  //   }, [image, imageUrl]);

  //   if (!image) {
  //     return <div>Loading...</div>;
  //   }

  //   return <img src={image} alt="Cached" />;
  // }

  // const imageUrl2: string = "https://th.bing.com/th/id/OIP.-KIUZvogETrg4GQWIVJnkgHaEK?pid=ImgDet&w=1000&h=562&rs=1";
  // const img = CachedImage(imageUrl2)



  // const first : string = import.meta.env.VITE_ROOT_API

  // const [tester, settester] = useState(first);

  // useEffect(() => {
  //   const srt : string = "jamaha";
  //   settester(srt)
  // }, []);

  // console.log("AAAA", tester);





  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* {img} */}
        <img src={src} alt='cachedImage' />
        <button onClick={() => ClearCache()}>hahahh</button>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 12</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
