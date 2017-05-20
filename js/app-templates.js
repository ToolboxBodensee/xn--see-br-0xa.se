//HEAD 
(function(app) {
try { app = angular.module("strichliste"); }
catch(err) { app = angular.module("strichliste", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("controllers/createUser/createUser.html","<div class=\"user-create row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <alert ng-repeat=\"alert in alerts\" type=\"alert.type\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "\n" +
    "        <h2 translate>createUserTitle</h2>\n" +
    "        <form role=\"form\" ng-submit=\"createUser()\">\n" +
    "            <input type=\"text\" name=\"name\" placeholder=\"{{'createUserInputPlaceholder' | translate}}\"\n" +
    "                   maxlength=\"23\" class=\"form-control form-input-name input-lg\"\n" +
    "                   ng-model=\"name\" required autocomplete=\"off\" autofocus>\n" +
    "            <br>\n" +
    "            <input type=\"submit\" value=\"{{'createUserSubmitLabel' | translate}}\" class=\"form-control\">\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "")

$templateCache.put("controllers/index/index.html","<div class=\"row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <alert ng-repeat=\"alert in alerts\" type=\"alert.type\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <ul class=\"nav nav-tabs\" ng-if=\"mode.tabbed\">\n" +
    "            <li ng-class=\"{ 'active': mode.currentTab == 'active' }\" ng-click=\"mode.currentTab = 'active'\" >\n" +
    "                <a translate>indexActiveUser</a>\n" +
    "            </li>\n" +
    "            <li ng-class=\"{ 'active': mode.currentTab == 'inactive' }\" ng-click=\"mode.currentTab = 'inactive'\">\n" +
    "                <a translate>indexInactiveUser</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-xs-12\" ng-if=\"mode.currentTab == 'active' || !mode.tabbed\">\n" +
    "        <h3 ng-hide=\"mode.tabbed\" translate>indexActiveUser</h3>\n" +
    "\n" +
    "        <ul class=\"user-list clearfix\">\n" +
    "            <li ng-repeat=\"user in activeUsers | orderBy:'name' track by user.id\"\n" +
    "                ng-click=\"userClick(user.id)\"\n" +
    "                class=\"col-xs-2 panel panel-default\"\n" +
    "                title=\"{{user.name}}\">\n" +
    "                <div class=\"name\">{{user.name}}</div>\n" +
    "                <div class=\"balance\" ng-class=\"user.balance < -0.009 ? 'negative' : ''\">{{user.balance | number:2}} {{currency}}</div>\n" +
    "            </li>\n" +
    "            <li class=\"col-xs-2 panel panel-default create-user\" ng-click=\"createUserClick()\">+</li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-xs-12\" ng-if=\"mode.currentTab == 'inactive' || !mode.tabbed\">\n" +
    "        <h3 ng-hide=\"mode.tabbed\" translate>indexInactiveUser</h3>\n" +
    "\n" +
    "        <ul class=\"user-list clearfix\">\n" +
    "            <li ng-repeat=\"user in inactiveUsers | orderBy:'name' track by user.id\"\n" +
    "                ng-click=\"userClick(user.id)\"\n" +
    "                class=\"col-xs-2 panel panel-default\"\n" +
    "                title=\"{{user.name}}\">\n" +
    "                <div class=\"name\">{{user.name}}</div>\n" +
    "                <div class=\"balance\" ng-class=\"user.balance < -0.009 ? 'negative' : ''\">{{user.balance | number:2}} {{currency}}</div>\n" +
    "            </li>\n" +
    "            <li class=\"col-xs-2 panel panel-default create-user\" ng-click=\"createUserClick()\">+</li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "</div>")

$templateCache.put("controllers/metrics/metrics.html","<div class=\"row metrics\">\n" +
    "\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <h2 translate>metricsOverviewHeadline</h2>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-xs-3 metric\">\n" +
    "        <h3 translate>metricsUsersLabel</h3>\n" +
    "        <span>{{metrics.countUsers}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-xs-3 metric\">\n" +
    "        <h3 translate>metricsTransactionsLabel</h3>\n" +
    "        <span>{{metrics.countTransactions}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-xs-3 metric\">\n" +
    "        <h3 translate>metricsSystemBalanceLabel</h3>\n" +
    "        <span ng-class=\"metrics.overallBalance < 0 ? 'negative' : ''\">{{metrics.overallBalance | number:2}} {{currency}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-xs-3 metric\">\n" +
    "        <h3 translate>metricsAverageBalanceLabel</h3>\n" +
    "        <span>{{metrics.avgBalance | number: 2}} {{currency}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <h2 translate>metricsChartIncomeHeadline</h2>\n" +
    "        <canvas id=\"payment\" class=\"chart chart-bar\" data=\"payment.data\" labels=\"payment.labels\" chart-options=\"chartOptions\" colours=\"payment.colors\" height=\"300\"></canvas>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <h2 translate>metricsActiveUserHeadline</h2>\n" +
    "        <canvas id=\"activeUser\" class=\"chart chart-bar\" data=\"activeUser.data\" labels=\"activeUser.labels\" chart-options=\"chartOptions\" colours=\"activeUser.colors\"></canvas>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <h2 translate>metricsTransactionsHeadline</h2>\n" +
    "        <canvas id=\"transaction\" class=\"chart chart-bar\" data=\"transaction.data\" labels=\"transaction.labels\" chart-options=\"chartOptions\" colours=\"transaction.colors\"></canvas>\n" +
    "    </div>\n" +
    "</div>\n" +
    "")

$templateCache.put("controllers/transaction/transaction.html","<div class=\"user-transaction\">\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <alert ng-repeat=\"alert in alerts\" type=\"alert.type\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\" ng-if=\"user\">\n" +
    "\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <h2><span translate translate-value-name=\"{{user.name}}\">transactionForUser</span> -\n" +
    "                <span translate translate-values=\"{current:currentPage, max:numPages}\">transactionCurrentPage</span></h2>\n" +
    "\n" +
    "            <pagination total-items=\"totalItems\" max-size=\"10\"\n" +
    "                        items-per-page=\"entriesPerPage\" num-pages=\"numPages\"\n" +
    "                        data-boundary-links=\"true\" page=\"currentPage\"\n" +
    "                        on-select-page=\"pageChanged(page)\"\n" +
    "                        previous-text=\"{{'previousPage' | translate}}\" next-text=\"{{'nextPage' | translate}}\"\n" +
    "                        first-text=\"{{'firstPage' | translate}}\" last-text=\"{{'lastPage' | translate}}\"></pagination>\n" +
    "\n" +
    "            <table class=\"table table-striped\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th translate>transactionCreateDate</th>\n" +
    "                        <th translate>transactionValue</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"transaction in transactions | orderBy:'-id' track by transaction.id\">\n" +
    "                        <td>{{transaction.createDate | localtime}}</td>\n" +
    "                        <td class=\"balance\" ng-class=\"transaction.value < 0 ? 'negative' : ''\">{{transaction.value|number:2}} {{currency}}</td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <button class=\"btn btn-default btn-lg back\" translate ng-click=\"backClick()\">back</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>")

$templateCache.put("controllers/user/user.html","<div class=\"user\">\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <alert ng-repeat=\"alert in alerts\" type=\"alert.type\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"user\">\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <h2 class=\"col-xs-12 col-sm-6\" translate translate-value-name=\"{{user.name}}\">userPageTitle</h2>\n" +
    "            <div class=\"col-xs-12 col-sm-6 account-balance\" ng-class=\"user.balance < -0.009 ? 'negative' : ''\">{{user.balance | number:2}} {{currency}}</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "\n" +
    "            <div class=\"col-xs-12 col-sm-6 credit\">\n" +
    "\n" +
    "                <div class=\"clearfix\">\n" +
    "                    <h3 translate>userChargeWallet</h3>\n" +
    "                    <button class=\"btn btn-success btn-lg col-xs-12 col-sm-2\" ng-disabled=\"transactionRunning || boundary.exceedsUpperLimit(user.balance + step)\" ng-click=\"transactionClick(step)\" ng-repeat=\"step in depositSteps\">{{step | number:2}} {{currency}}</button>\n" +
    "                    <button class=\"btn btn-success btn-lg col-xs-12 col-sm-2\" ng-disabled=\"transactionRunning || boundary.exceedsOrEqualsUpperLimit(user.balance)\" ng-click=\"customTransactionClick('charge')\" ng-if=\"customTransactions\">? {{currency}}</button>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"clearfix\">\n" +
    "                    <h3 translate>userSpendMoney</h3>\n" +
    "                    <button class=\"btn btn-primary btn-lg col-xs-12 col-sm-2\" ng-disabled=\"transactionRunning || boundary.exceedsLowerLimit(user.balance - step)\" ng-click=\"transactionClick(step*-1)\" ng-repeat=\"step in dispenseSteps\">{{step | number:2}} {{currency}}</button>\n" +
    "                    <button class=\"btn btn-primary btn-lg col-xs-12 col-sm-2\" ng-disabled=\"transactionRunning || boundary.exceedsOrEqualsLowerLimit(user.balance)\" ng-click=\"customTransactionClick('spend')\" ng-if=\"customTransactions\">? {{currency}}</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-xs-12 col-sm-6\">\n" +
    "                <h3>{{'userLastTransactions' | translate:'{number: 5}'}} (<a ng-click=\"showAllClick()\">{{'showAll' | translate}}</a>)</h3>\n" +
    "                <table class=\"table table-striped\">\n" +
    "                    <tbody>\n" +
    "                    <tr ng-repeat=\"transaction in user.transactions | orderBy:'-id' | limitTo : 5\">\n" +
    "                        <td>{{transaction.createDate | localtime}}</td>\n" +
    "                        <td class=\"balance\" ng-class=\"transaction.value < 0 ? 'negative' : ''\">{{transaction.value | number:2}} {{currency}}</td>\n" +
    "                    </tr>\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <button class=\"btn btn-default btn-lg back\" translate ng-click=\"backClick()\">back</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>")

$templateCache.put("modals/customTransaction/customTransaction.html","<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\" translate>customTransactionHeadline</h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "    <alert ng-repeat=\"alert in alerts\" type=\"alert.type\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "\n" +
    "    <alert ng-if=\"transactionMode == 'spend' && boundary.exceedsLowerLimit(user.balance - transactionValue) ||\n" +
    "                  transactionMode == 'charge' && boundary.exceedsUpperLimit(user.balance + transactionValue)\"\n" +
    "           type=\"alert.type\">\n" +
    "        <span translate>transactionBoundaryReached</span>\n" +
    "    </alert>\n" +
    "\n" +
    "    <p translate>customTransactionDescription</p>\n" +
    "    <form ng-submit=\"submitTransaction(transactionValue)\">\n" +
    "        <div class=\"input-group input-group-lg\">\n" +
    "            <span class=\"input-group-addon\">{{currency}}</span>\n" +
    "            <input type=\"number\"\n" +
    "                   step=\"0.01\"\n" +
    "                   class=\"form-control transaction-value\"\n" +
    "                   placeholder=\"0.42\"\n" +
    "                   ng-model=\"transactionValue\" required autocomplete=\"off\" autofocus>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-lg btn-primary\"\n" +
    "            ng-disabled=\"boundary.exceedsLowerLimit(user.balance - transactionValue)\"\n" +
    "            ng-click=\"submitTransaction(transactionValue)\"\n" +
    "            ng-if=\"transactionMode == 'spend'\" translate>customTransactionPay</button>\n" +
    "    <button class=\"btn btn-lg btn-success\"\n" +
    "            ng-disabled=\"boundary.exceedsUpperLimit(user.balance + transactionValue)\"\n" +
    "            ng-click=\"submitTransaction(transactionValue)\"\n" +
    "            ng-if=\"transactionMode == 'charge'\" translate>customTransactionCharge</button>\n" +
    "    <button class=\"btn btn-lg btn-default\" ng-click=\"cancel()\" translate>cancel</button>\n" +
    "</div>")
}]);
})();