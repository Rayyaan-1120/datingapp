package com.instadating;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import android.content.Intent;
import android.content.res.Configuration;
import androidx.annotation.NonNull;
import androidx.multidex.MultiDexApplication;

import expo.modules.ApplicationLifecycleDispatcher;
import expo.modules.ReactNativeHostWrapper;

import java.lang.reflect.InvocationTargetException;


// import com.twiliorn.library.TwilioPackage;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactInstanceManager;
 import com.facebook.react.ReactNativeHost;
import com.reactcommunity.rnlocalize.RNLocalizePackage;

import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.instadating.launchapplication.LaunchApplicationPackage;
import com.instadating.videoplayer.VideoPlayerPackage;

import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new ReactNativeHostWrapper(
    this,
    new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new VideoPlayerPackage());
      // packages.add(new TwilioPackage());
      packages.add(new LaunchApplicationPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  });

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    ApplicationLifecycleDispatcher.onApplicationCreate(this);
  }

  
  @Override
  public void onConfigurationChanged(@NonNull Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    sendBroadcast(intent);
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
  }

     /**
    * Loads Flipper in React Native templates. Call this in the onCreate method with something like
    * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    *
    * @param context
    * @param reactInstanceManager
    */
   private static void initializeFlipper(
       Context context, ReactInstanceManager reactInstanceManager) {
     if (BuildConfig.DEBUG) {
       try {
         /*
          We use reflection here to pick up the class that initializes Flipper,
         since Flipper library is not available in release mode
         */
         Class<?> aClass = Class.forName("com.awesomeapp.ReactNativeFlipper");
         aClass
             .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
             .invoke(null, context, reactInstanceManager);
       } catch (ClassNotFoundException e) {
         e.printStackTrace();
       } catch (NoSuchMethodException e) {
         e.printStackTrace();
       } catch (IllegalAccessException e) {
         e.printStackTrace();
       } catch (InvocationTargetException e) {
         e.printStackTrace();
       }
     }
   }
}
