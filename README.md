# QFE Project

This is the Python backend for my Computer Science 523 class (Software Engineering). The purpose of this application is to retrieve price information from Quandl on a set of financial assets, convert them to log returns, form a portfolio, and optimize that portfolio given a set of parameters. Overall, this code creates the necessary data for our frontend view

## Getting Started

To see the system running, visit https://qfe-app-523-maguilar.cloudapps.unc.edu/#!/. There is an additional README file on this page with more specific instructions

If you want to install and run the backend on a local device, installing Anaconda is recommended. Once Anaconda is installed, add all dependancies using the method mentioned in "Prerequisites". Note, any interface attempting to access the locally running backend will need to update URLs for AJAX calls. Use Python 3's built in http.server method to run the backend.

### Prerequisites

To install depenencies use "pip install -r requirements.txt" from the directory where the code is located. For a list of dependancies, check out requirements.txt 

### Usage
At any time you can return home using the home button located on the top left hand corner of the page.  If you need more instructions or would like to read the legal notes you can click the questionmark button located just next to the home button at the top left hand side of the webpage.

In order to retrieve data, first select an investable universe. The universes are as follows:
US Equities ([IYH,IYF,IYK,IYW] = [Healthcare, Financials, Consumer Goods, Technology])
International Equities ([EWG,EWU,EWJ,FXI] = [Germany, United Kingdom, Japan, China])
Foreign Exchange ([FXB,FXCH,FXE,FXY] = [British Pound, Chinese Yuan, Euro, Japanese Yen])
Commodities ([IAU,SLV,VEGI,FILL] = [Gold, Silver, Agriculture, Energy])
If an incorrect date range is entered, the application will display an error. For example, if the date range is inverted an error will appear. Also, if monthly rebalancing frequency is chosen then the date interval will be limited to between 4 months and 2 years worth of data. Similarly, quarterly rebalancing is limited to within 1 year and 4 years and biannual rebalancing is limited to within 2 years and 8 years
Transaction costs can be included by indicting "Yes" or "No" in the drop down menu
Currently, the objective function is limited to the Sharpe Ratio. Additional objective functions may be added in the future
Rebalancing frequency options are "Monthly", "Quarterly", or "Biannually". This will adjust how often the optimization function runs to reallocate the portfolio
The benchmarks included in this application are as follows:
SP500 (IVV)
International Equity (EFA)
US 10 Year Treasury (IEF)
Commodities (GSG)
To run the application, you are required to enter a date interval. See several bullet points above for valid date ranges
The data depicted in this application is derived from log returns based upon daily adjusted closing prices taken from Quandl, specifically the EOD database. For example, a date range of 9/1/2017 through 11/3/2017 uses the daily adjusted closing price on 10/31/2017 as a base to compute the daily log return on 9/1/2017
For a complete list of securities available via this application, see the EOD database description on the Quandl website
If a starting or ending date is a market closure, the prior available trading day is used as a substitute. Days that the market is closed are ignored by this applicaiton
When computing monthly returns, the calendar month associated with the starting and ending dates is used. For example, a date range of 9/1/2017 through 11/3/2017 would generate a holding period from the last trading day of October 2017 through the last trading day of November 2017
When computing weekly returns, the last trading day of the calendar week in which the starting and ending dates fall is used. For example, a starting date of 10/5/2017 and ending date of 11/16/2017 would use the 10/6/2017 and 11/16/2017 adjusted closing prices
Because of the date rounding associated with weekly and monthly returns, slight differences in culumaltive returns over a period will be noticable. For the most cumulative returns over a period, see the daily cumulative returns entry in the summary statistics table

## Contributing

Nicholas McHenry

Douglas Hoelzel

Avery Lue

Kurtis Bass

## Author

Nicholas McHenry

## Acknowledgments

Micheal Aguilar
