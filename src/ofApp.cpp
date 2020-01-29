#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    logo.load("logo.png");

    shader.load("default.vert", "tparty.frag", false, true);
}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){
    
    ofEnableAlphaBlending();

    //debug
    ofSetColor(255,255,255,120);
    logo.draw(0,0,ofGetWidth(), ofGetHeight());

    // main draw
    shader.begin();

    ofDrawRectangle(0,0,ofGetWidth(), ofGetHeight());
    shader.setUniform2f("resolution", ofGetWidth(), ofGetHeight());

    shader.end();


    ofDisableAlphaBlending();

}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
