/*******************************************************************************
 * getTestURLParams.js:
 *      Component of the DOH-based test suite for the OpenAjax Hub.
 *
 *      Look for a series of URL params. If found, set some global variables.
 *
 * Copyright 2008 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not 
 * use this file except in compliance with the License. You may obtain a copy 
 * of the License at http://www.apache.org/licenses/LICENSE-2.0 . Unless 
 * required by applicable law or agreed to in writing, software distributed 
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR 
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
 *
 ******************************************************************************/

var TestURLParams = {};
TestURLParams.client0 = null;
TestURLParams.client1 = null;
TestURLParams.client2 = null;
TestURLParams.client3 = null;
TestURLParams.client4 = null;
TestURLParams.getTestURLParams = function () {
    TestURLParams.client0 = OpenAjax.gadgets.util.getUrlParameters()["client0"];
    TestURLParams.client1 = OpenAjax.gadgets.util.getUrlParameters()["client1"];
    TestURLParams.client2 = OpenAjax.gadgets.util.getUrlParameters()["client2"];
    TestURLParams.client3 = OpenAjax.gadgets.util.getUrlParameters()["client3"];
    TestURLParams.client4 = OpenAjax.gadgets.util.getUrlParameters()["client4"];
}();
