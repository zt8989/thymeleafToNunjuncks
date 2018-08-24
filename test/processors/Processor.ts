import DefaultProcessor from '../../src/processors/DefaultProcessor'
import { JSDOM } from 'jsdom'
import IfAttributeProcessor from '../../src/processors/IfAttributeProcessor';
import FragmentAttributeProcessor from '../../src/processors/FragmentAttributeProcessor';
import HrefAttributeProcessor from '../../src/processors/HrefAttributeProcessor'
import TextAttributeProcessor from '../../src/processors/TextAttributeProcessor';
import SrcAttributeProcessor from '../../src/processors/SrcAttributeProcessor';
import convertEngine from '../../src';
import fs from 'fs'

test('DefaultProcessor', function () {
  new convertEngine().process(`
  <th:block layout:fragment="content">
  <div class="modal fade js-viewDetail Dialog--viewDetail">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title"><span>查看</span>车辆信息</h4>
        </div>
        <div class="modal-body TransportInfo">
          <div class="TransportInfo-basic">
            <form class="FieldSet--carProps Area--edit js-editCarProps">
              <table>
                <colgroup>
                  <col style="width: 9.5em;" />
                  <col style="" />
                </colgroup>
                <tbody>
                  <th:block th:replace="admin/partials/fieldset-carProps-basic :: carPropsBasic"></th:block>
                  <th:block th:if="\${orderDetail.transportType != 3}">
                    <tr>
                      <th>公里数</th>
                      <td>
                        <div class="FieldGroup FieldGroup--odometer"><input class="form-control input-sm Field--input js-fillOdometer" type="text" name="odometer" value="" data-h5f-label="公里数" pattern="(^[1-9][0-9]{0,4}(\.[0-9])?$)?" /><div class="js-showOdometerPhoto"><img src="" alt="" /></div></div>
                      </td>
                    </tr>
                    <tr>
                      <th>生产日期</th>
                      <td>
                        <div class="FieldGroup"><input class="form-control input-sm Field--input js-pickProductionDate" type="text" value="" name="productionDate" data-h5f-label="生产日期" /></div>
                      </td>
                    </tr>
                  </th:block>
                  <tr>
                    <th>车架号</th>
                    <td>
                      <div class="FieldGroup FieldGroup--VIN"><input class="form-control input-sm Field--input js-fillVIN" type="text" name="carUnique" value="" data-h5f-label="车架号" /><div class="js-showPlatePhoto"><img src="" alt="" /></div></div>
                    </td>
                  </tr>
                  <tr>
                    <th>指导价</th>
                    <td>
                      <div class="FieldGroup"><input class="form-control input-sm Field--input u-inlineBlock" type="number" name="guidePrice" value="0" min="0" data-h5f-label="指导价" /> 万元</div>
                    </td>
                  </tr>
                  <tr>
                    <th>运输车辆车牌号</th>
                    <td>
                      <div class="FieldGroup">
                        <select class="form-control input-sm js-licensePlate" name="plateNumber" data-h5f-label="运输车辆车牌号" data-placeholder="请输入运输车辆车牌号" disabled="disabled"></select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>运输车辆司机</th>
                    <td>
                      <div class="FieldGroup"><input class="form-control input-sm Field--input u-inlineBlock" type="text" name="driverName" value="" data-h5f-label="运输车辆司机" placeholder="请输入运输车辆司机" disabled="disabled" /></div>
                    </td>
                  </tr>
                  <tr>
                    <th>运输车辆司机电话</th>
                    <td>
                      <div class="FieldGroup"><input class="form-control input-sm Field--input u-inlineBlock" type="number" name="phoneNumber" maxlength="14" placeholder="请输入联系方式" data-h5f-label="联系方式" disabled="disabled" /></div>
                    </td>
                  </tr>
                  <tr>
                    <th>运输车辆车牌颜色</th>
                    <td>
                      <div class="FieldGroup">
                        <select name="vehiclePlateColorCode" class="form-control input-sm" data-placeholder="选择车牌颜色" data-h5f-label="车牌颜色" disabled="disabled">
                          <option value=""></option>
                          <option th:each="s : \${plateColorArray}" th:value="\${s.code}" th:text="\${s.color}"></option>
                        </select>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <input type="hidden" name="transportCarId" value="" />
              <input type="hidden" name="arriveTime" value="" />
            </form>
            <div class="Area--view row">
              <div class="col-xs-6">
                <ul>
                  <li>车架号：<span data-field="carUnique"></span></li>
                  <li>车辆属性：<span data-field="carSnapInfo"></span></li>
                  <li>指导价：<span data-field="guidePrice"></span>万元</li>
                  <li>合同价：<span data-field="transportGuidePrice"></span>万元</li>
                  <th:block th:if="\${orderDetail.bizType == 2 and orderDetail.transportType != 3}">
                    <li>提车公里数：<span data-field="odometer"></span></li>
                    <li>生产日期：<span data-field="productionDate"></span></li>
                  </th:block>
                </ul>
              </div>
              <div th:class="\${orderDetail.bizType == 2 ? 'col-xs-6' : 'col-xs-3'}">
                <ul>
                  <li>运价：<span data-field="transportPrice"></span>元</li>
                  <li>提验车费：<span data-field="serviceCharge"></span>元</li>
                  <li>保险费：<span data-field="insurance"></span>元</li>
                  <li>合计费用：<span data-field="totalPrice"></span>元</li>
                </ul>
              </div>
              <div th:class="\${orderDetail.bizType == 2 ? 'col-xs-6' : 'col-xs-3'}" th:if="\${orderDetail.bizType != 2}">
                <ul>
                  <li>提车人姓名：<span data-field="contactName"></span></li>
                  <li>手机号码：<span data-field="contactPhone"></span></li>
                  <li>身份证号：<span data-field="contactIdentityNO"></span></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="TransportInfo-transportation InfoSection">
            <h5 class="InfoSection-title">在途信息</h5>
            <ul class="ProgressInfo" data-field="inTransitRecordList"></ul>
          </div>
          <div class="TransportInfo-inspection InfoSection">
            <h5 class="InfoSection-title">验车照片</h5>
            <div th:replace="admin/partials/car-inspection :: carInspection"></div>
          </div>
          <div class="TransportInfo-otherPhotos InfoSection">
            <h5 class="InfoSection-title">其他照片</h5>
            <div class="ImageList row">
              <div class="ImageList-item col-sm-4">
                <figure class="ImageItem">
                  <div><a href="" target="_blank"><img src="" alt="保单" data-field="imgPolicy" /></a></div>
                  <figcaption>保单</figcaption>
                  <button type="button" class="ImageItem-button fa fa-close js-removeUploadedImage" title="删除"><span class="sr-only">&times;</span></button>
                </figure>
                <button class="ImageItem ImageItem--add js-uploadCarPhoto" type="button">
                  <div><span><i class="fa fa-plus"></i><span>保单</span></span></div>
                </button>
              </div>
              <div class="ImageList-item col-sm-4">
                <figure class="ImageItem">
                  <div><a href="" target="_blank"><img src="" alt="交车单" data-field="imgDelivery" /></a></div>
                  <figcaption>交车单</figcaption>
                  <button type="button" class="ImageItem-button fa fa-close js-removeUploadedImage" title="删除"><span class="sr-only">&times;</span></button>
                </figure>
                <button class="ImageItem ImageItem--add js-uploadCarPhoto" type="button">
                  <div><span><i class="fa fa-plus"></i><span>交车单</span></span></div>
                </button>
              </div>
              <div class="ImageList-item col-sm-4" th:if="\${orderDetail.bizType == 2}">
                <figure class="ImageItem ImageItem--pickLetter">
                  <div><a href="" target="_blank"><img src="" alt="提车函" data-field="imgPickLetter" /></a></div>
                  <figcaption>提车函</figcaption>
                  <button type="button" class="ImageItem-button fa fa-close js-removeUploadedImage" title="删除"><span class="sr-only">&times;</span></button>
                </figure>
                <button class="ImageItem ImageItem--add js-uploadCarPhoto" type="button">
                  <div><span><i class="fa fa-plus"></i><span>提车函</span></span></div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-saveCarInfo">提交</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade js-viewInspectionDetail Dialog--viewInspection">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" type="button" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">查看验车照片</h4>
        </div>
        <div class="modal-body">
          <div th:replace="admin/partials/car-inspection :: carInspection"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade js-viewProgressDetail Dialog--viewProgress">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" type="button" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">查看在途信息</h4>
        </div>
        <div class="modal-body">
          <ul class="ProgressInfo"></ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade js-viewPickerDetail">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" type="button" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">查看提车人信息</h4>
        </div>
        <div class="modal-body">
          <ul>
            <li>姓名：<span data-field="contactName"></span></li>
            <li>手机号：<span data-field="contactPhone"></span></li>
            <li>身份证号：<span data-field="contactIdentityNO"></span></li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade js-editBillBasic">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">修改运单基本信息</h4>
        </div>
        <div class="modal-body">

          <form action="/transportOrder/edit/base.json">
            <textarea th:if="\${orderDetail.dispatcherRemarks!=''}" disabled="disabled" name="dispatcherRemarksHistory" rows="3" class="form-control input-sm dispatcherRemarksHistory" th:text="\${orderDetail.dispatcherRemarks}"></textarea>
            <div class="form-group">
              <label>调度员备注</label>
              <textarea name="dispatcherRemarks" rows="3" class="form-control input-sm" placeholder="请输入备注信息（最多 100 个字）" maxlength="100"></textarea>
            </div>
            <div class="form-group Field--contracts" th:if="\${orderDetail.orderStatus == 2 || orderDetail.orderStatus == 3}">
              <label>运输合同</label>
              <div class="ImageList row">
                <div class="ImageList-item col-sm-4">
                  <button class="ImageItem ImageItem--add js-uploadContract" type="button" style="display: block;">
                    <div><span><i class="fa fa-plus"></i><span>上传合同</span></span></div>
                  </button>
                </div>
              </div>
              <input type="hidden" name="transportContractList" value="" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-saveModified">提交</button>
        </div>
      </div>
    </div>
  </div>

  <!--<div class="modal fade js-editBillPrice Dialog&#45;&#45;editPrice">-->
    <!--<div class="modal-dialog">-->
      <!--<div class="modal-content">-->
        <!--<div class="modal-header">-->
          <!--<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>-->
          <!--<h4 class="modal-title">修改运单费用</h4>-->
        <!--</div>-->
        <!--<div class="modal-body">-->
          <!--<form action="/transportOrder/edit/fee.json" class="row">-->
            <!--<div class="form-horizontal col-xs-6 Section">-->
              <!--<h5 class="Section-title">客户结算</h5>-->
              <!--<div class="form-group">-->
                <!--<label class="col-sm-4 control-label">总价</label>-->
                <!--<div class="col-sm-8"><input type="number" name="totalPrice" class="form-control input-sm" th:value="\${orderDetail.customerTotalPrice}" min="0" max="999999" data-h5f-label="总价" /></div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="form-horizontal col-xs-6 Section">-->
              <!--<h5 class="Section-title">承运商结算</h5>-->
              <!--<div class="form-group">-->
                <!--<label class="col-sm-4 control-label">运价</label>-->
                <!--<div class="col-sm-8"><input type="number" name="carrierTransportPrice" class="form-control input-sm" th:value="\${orderDetail.carrierTransportPrice}" min="0" max="999999" data-h5f-label="运价" /></div>-->
              <!--</div>-->
              <!--<div class="form-group">-->
                <!--<label class="col-sm-4 control-label">放空费</label>-->
                <!--<div class="col-sm-8"><input type="number" name="carrierEmptyRunPrice" class="form-control input-sm" th:value="\${orderDetail.carrierEmptyRunPrice}" min="0" max="999999" data-h5f-label="放空费" /></div>-->
              <!--</div>-->
              <!--<div class="form-group">-->
                <!--<label class="col-sm-4 control-label">等待费</label>-->
                <!--<div class="col-sm-8"><input type="number" name="carrierAwaitPrice" class="form-control input-sm" th:value="\${orderDetail.carrierAwaitPrice}" min="0" max="999999" data-h5f-label="等待费" /></div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</form>-->
        <!--</div>-->
        <!--<div class="modal-footer">-->
          <!--<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>-->
          <!--<button type="button" class="btn btn-primary js-saveModified">提交</button>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->

  <div class="modal fade js-editBillTransporter">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">修改承运商信息</h4>
        </div>
        <div class="modal-body">
          <form action="/transportOrder/reBindingCarrier.json" class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">承运商</label>
              <div class="col-sm-10">
                <select name="carrierId" class="form-control input-sm js-selectClient" data-placeholder="请输入承运商" data-h5f-label="承运商">
                  <option value=""></option>
                </select>
                <input type="hidden" name="carrierName" value="" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">联系人</label>
              <div class="col-sm-10">
                <select name="staffId" class="form-contorl input-sm js-addStaff--transporter" data-placeholder="选择联系人" th:attr="data-value=(\${orderDetail.carrierContactId})">
                  <option value=""></option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-saveModified">提交</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade js-editBillClient">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">修改客户信息</h4>
        </div>
        <div class="modal-body">
          <form action="/transportOrder/edit/clientStaff.json" class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">客户</label>
              <div class="col-sm-10"><input type="text" class="form-control input-sm" readonly="readonly" th:value="\${orderDetail.clientName}" /></div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">联系人</label>
              <div class="col-sm-10">
                <select name="clientStaffId" class="form-contorl input-sm js-addStaff--client" data-placeholder="选择联系人" th:attr="data-value=(\${orderDetail.clientContactId})">
                  <option value=""></option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-saveModified">提交</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade js-editBillDelivery">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">修改发车方联系信息</h4>
        </div>
        <div class="modal-body">
          <form action="/transportOrder/edit/consignee.json" class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-3 control-label is-required">提车联系人</label>
              <div class="col-sm-9"><input type="text" name="consigneeName" required="required" class="form-control input-sm" placeholder="请输入联系人名字" data-h5f-label="提车联系人" th:value="\${orderDetail.consigneeName}" minlength="2" maxlength="5" /></div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label is-required">联系方式</label>
              <div class="col-sm-9"><input type="text" name="consigneePhone" required="required" class="form-control input-sm" placeholder="请输入联系方式" data-h5f-label="联系方式" th:value="\${orderDetail.consigneePhone}" pattern="{{MOBILE}}" /></div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label is-required">提车地址</label>
              <div class="col-sm-9"><input type="text" name="consigneeAddress" required="required" class="form-control input-sm" placeholder="请输提车地址" data-h5f-label="提车地址" th:value="\${orderDetail.consigneeAddress}" maxlength="50" /></div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-saveModified">提交</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade js-editBillCloseCar">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">修改收车方联系信息</h4>
        </div>
        <div class="modal-body">
          <form action="/transportOrder/edit/receiverInfo.json" class="form-horizontal">
            <div class="form-group">

              <label class="col-sm-3 control-label">交车联系人</label>
              <div class="col-sm-9"><input type="text" name="receiverName"  class="form-control input-sm" placeholder="请输入联系人名字" data-h5f-label="提车联系人" th:value="\${orderDetail.receiverName}" minlength="2" maxlength="5" /></div>

            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">联系方式</label>
              <div class="col-sm-9"><input type="text" name="receiverPhone"  class="form-control input-sm" placeholder="请输入联系方式" data-h5f-label="联系方式" th:value="\${orderDetail.receiverPhone}" pattern="{{MOBILE}}" /></div>
            </div>
            <div class="form-group">

              <label class="col-sm-3 control-label">交车地址</label>
              <div class="col-sm-9"><input type="text" name="receiverAddress" class="form-control input-sm" placeholder="请输提车地址" data-h5f-label="提车地址" th:value="\${orderDetail.receiverAddress}" maxlength="50" /></div>

            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">身份证</label>
              <div class="col-sm-9"><input type="text" name="receiverIdentityNo" class="form-control input-sm" placeholder="请输入身份证" data-h5f-label="身份证" th:value="\${orderDetail.receiverIdentityNo}" maxlength="18" /></div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-saveModifiedCloseCar">提交</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade js-fillDestination">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">添加到达地点</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal js-fillDestinationInfo">
            <div class="form-group">
              <label class="col-sm-2 control-label is-required">到达时间</label>
              <div class="col-sm-10">
                <input type="text" class="form-control input-sm js-pickDate" name="arriveTimeFaker" data-to="inTransitTime" placeholder="请选择到达时间" required="required" data-h5f-label="到达时间" />
                <input type="hidden" name="inTransitTime" value="" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label is-required">到达地点</label>
              <div class="col-sm-10">
                <select class="js-chooseProvince form-control input-sm" data-placeholder="选择省份" data-minimum-results-for-search="0">
                  <option value=""></option>
                </select>
                <select class="js-chooseCity form-control input-sm" data-placeholder="选择城市" data-minimum-results-for-search="0" name="destinationCity" required="required" data-h5f-label="到达地点">
                  <option value=""></option>
                </select>
                <input type="hidden" name="location" value="" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">备注</label>
              <div class="col-sm-10">
                <textarea name="remarks" rows="3" class="form-control input-sm"></textarea>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-saveDestinationInfo">提交</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade js-selectWarehouse">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">修改停放仓库</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label is-required">停放仓库</label>
              <div class="col-sm-10">
                <select name="warehouseId" class="form-contorl input-sm js-chooseWarehouse" data-placeholder="请输入仓库" required="required" data-h5f-label="仓库">
                  <option value=""></option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-saveWarehouseInfo">提交</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade js-fillArriveTime">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">编辑到达时间</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label is-required">到达时间</label>
              <div class="col-sm-10">
                <input type="text" class="form-control input-sm js-pickDateTime" data-to="arriveTime" placeholder="请选择到达时间" required="required" data-h5f-label="到达时间" />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-saveArriveTime">提交</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade js-pickCarsWarehouse">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">选择中途提车仓库</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-4 control-label is-required">请选择中途提车仓库：</label>
              <div class="col-sm-8">
                <select name="warehouseId" class="form-contorl input-sm js-chooseWarehouse" data-placeholder="请输入仓库" required="required" data-h5f-label="仓库">
                  <option value=""></option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-4 control-label is-required">请输入需调整的物流费用(单位：元/车)：</label>
              <div class="col-sm-3">
                <select name="feePattern" class="form-contorl input-sm" required="required">
                  <option value="0">增加</option>
                  <option value="1">减少</option>
                </select>
              </div>
              <div class="col-sm-5">
                <div class="Field input-group" data-tariff-type="1">
                  <input type="number" name="priceChanged" class="form-control input-sm js-inputCheckRate u-inputPrice" required="required" min="0" value="" data-h5f-label="需调整的物流费用" placeholder="请输入需调整的物流费用" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-savePickCarsInfo">提交</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade js-pickCarsContactInfor">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title"><span>编辑</span>提车人信息</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-3 control-label is-required">提车人：</label>
              <div class="col-sm-9">
                <input type="text" name="carrierPickContactName" required="required" class="form-control input-sm" placeholder="请输提车人" data-h5f-label="提车人" maxlength="50" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label is-required">身份证号：</label>
              <div class="col-sm-9">
                <input type="text" name="carrierPickContactIdentity" required="required" class="form-control input-sm" placeholder="请输身份证号" data-h5f-label="身份证号" minlength="18" maxlength="18" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">联系方式：</label>
              <div class="col-sm-9">
                <input type="number" name="carrierPickContactPhone" class="form-control input-sm" placeholder="请输联系方式" data-h5f-label="联系方式" maxlength="14" />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-savePickCarsContact">提交</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade js-maintainCarsInfor">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">运输信息维护</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-4 control-label is-required">运输车辆车牌号：</label>
              <div class="col-sm-8">
                <select class="form-control input-sm js-licensePlate" name="plateNumber" data-h5f-label="运输车辆车牌号" data-placeholder="请输入运输车辆车牌号" required="required" style="width: 100%;"></select>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-4 control-label is-required">运输车辆司机：</label>
              <div class="col-sm-8">
                <input type="text" name="driverName" required="required" class="form-control input-sm" placeholder="请输入运输车辆司机" data-h5f-label="运输车辆司机" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-4 control-label">运输车辆司机电话：</label>
              <div class="col-sm-8">
                <input type="number" name="phoneNumber" class="form-control input-sm" required="required" placeholder="请输入运输车辆司机电话" data-h5f-label="运输车辆司机电话" maxlength="14" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-4 control-label is-required">运输车辆车牌颜色：</label>
              <div class="col-sm-8">
                <select class="form-control input-sm" name="vehiclePlateColorCode" data-h5f-label="车牌颜色" data-placeholder="请输入车牌颜色" required="required" style="width: 100%;">
                  <option value=""></option>
                  <option th:each="s : \${plateColorArray}" th:value="\${s.code}" th:text="\${s.color}"></option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-saveMaintainCars" data-status="1">确定并提车</button>
          <button type="button" class="btn btn-primary js-saveMaintainCars" data-status="2">确定</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade js-addOnWayRemarks">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">添加在途备注</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal js-fillDestinationInfo">
            <div class="form-group">
              <label class="col-sm-2 control-label is-required">备注</label>
              <div class="col-sm-10">
                <textarea name="remark" rows="3" class="form-control input-sm" maxlength="250" required="required" data-h5f-label="备注" data-placeholder="请输入备注"></textarea>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-saveOnWayRemarks">提交</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 编辑调度员 -->
  <div class="modal fade js-editDispatcher" th:if="\${editable}">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">修改调度员</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-3 control-label is-required">调度员</label>
              <select name="dispatcherId" class="js-select-dispatcher form-control input-sm" data-placeholder="" data-minimum-results-for-search="0">
                <option th:value="\${orderDetail.dispiatcherId}" th:text="\${orderDetail.dispatcherName}"></option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="submit" class="btn btn-primary js-saveDispatcher">提交</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 编辑单辆车的价格 -->
  <div class="modal fade js-editCarPrice">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">修改车辆费用</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-3 control-label is-required">运价</label>
              <div class="col-sm-9"><input type="number" name="transportPrice" class="form-control input-sm" required="required" value="" min="0" max="999999" data-h5f-label="运价" /></div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label is-required">放空费</label>
              <div class="col-sm-9"><input type="number" name="emptyRunPrice" class="form-control input-sm" required="required" value="" min="0" max="999999" data-h5f-label="放空费" /></div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label is-required">等待费</label>
              <div class="col-sm-9"><input type="number" name="awaitPrice" class="form-control input-sm" required="required" value="" min="0" max="999999" data-h5f-label="等待费" /></div>
            </div>
            <input type="hidden" name="transportCarId" value="" />
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-saveCarPrice">提交</button>
        </div>
      </div>
    </div>
  </div>


  <!--电子保单-->
  <div class="modal fade js-electronic-insurance">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" type="button" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">创建电子保单</h4>
        </div>
        <div class="modal-body">
          <ul class="mhc-steps" style="margin-bottom: 30px"></ul>
          <div class="panelOne">
            <form class="form-horizontal" style="margin-bottom: 20px;">
              <div class="form-group">
                <label class="col-sm-2 control-label is-required">保险生效起期</label>
                <div class="col-sm-4"><input type="text" name="time" class="form-control js-dateTimeSelector" required="required" placeholder="请选择" data-h5f-label="保险生效起期" /></div>
              </div>
            </form>
            <table class="table-cars"></table>
          </div>
          <div class="panelTwo" >
            <h4 style="padding-left: 20px;">投被保信息</h4>
            <form class="form-horizontal">
                <div class="form-group">
                  <div class="col-sm-6 row">
                    <label class="col-sm-5 control-label">对象类型</label>
                    <div class="col-sm-7">
                      <label class="checkbox-inline">
                        <input type="checkbox"  value="1" checked="checked" disabled="disabled"/> 团队
                      </label>
                      <label class="checkbox-inline">
                        <input type="checkbox"  value="2" disabled="disabled"/> 个人
                      </label>
                    </div>
                  </div>
                </div>
              <div class="form-group">
                <div class="col-sm-6 row">
                  <label class="col-sm-5 control-label">被投保人</label>
                  <div class="col-sm-7">
                      <input type="text"  class="form-control" value="运上好车"  readonly="readonly"/>
                  </div>
                </div>
                <div class="col-sm-6 row">
                  <label class="col-sm-5 control-label">投保人</label>
                  <div class="col-sm-7">
                    <input type="text"  class="form-control" value="运上好车"  readonly="readonly"/>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-6 row">
                  <label class="col-sm-5 control-label">统一社会信用代码</label>
                  <div class="col-sm-7">
                    <input type="text"  class="form-control" value="91330110MA28UPTUXD"  readonly="readonly"/>
                  </div>
                </div>
                <div class="col-sm-6 row">
                  <label class="col-sm-5 control-label">统一社会信用代码</label>
                  <div class="col-sm-7">
                    <input type="text"  class="form-control" value="91330110MA28UPTUXD"  readonly="readonly"/>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-6 row">
                  <label class="col-sm-5 control-label">被投保联系人</label>
                  <div class="col-sm-7">
                    <input type="text"  class="form-control" value="杨承庭"  readonly="readonly"/>
                  </div>
                </div>
                <div class="col-sm-6 row">
                  <label class="col-sm-5 control-label">投保联系人</label>
                  <div class="col-sm-7">
                    <input type="text"  class="form-control" value="杨承庭"  readonly="readonly"/>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-6 row">
                  <label class="col-sm-5 control-label">联系电话</label>
                  <div class="col-sm-7">
                    <input type="text"  class="form-control" value="15067141207"  readonly="readonly"/>
                  </div>
                </div>
                <div class="col-sm-6 row">
                  <label class="col-sm-5 control-label">联系电话</label>
                  <div class="col-sm-7">
                    <input type="text"  class="form-control" value="15067141207"  readonly="readonly"/>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-info js-next">下一步</button>
          <button type="button" class="btn btn-info js-prev">上一步</button>
          <button type="button" class="btn btn-success js-create">创建</button>
        </div>
      </div>
    </div>
  </div>



  <!-- 车辆批量操作按钮区域 -->
  <div class="js-batchOpeLeft" th:if="\${editable} and \${power.orderEdit}">
    <div class="dropdown">
      <button class="btn btn-primary btn-sm" type="button" data-toggle="dropdown" disabled="disabled">通知操作<span class="caret"></span></button>
      <ul class="dropdown-menu">
        <li><a class="js-noticeCheck" data-flag="inspection" href="javascript:void(0);">通知验车</a></li>
        <li style="display:none;"><a class="js-noExpComplete" data-flag="delivery" href="javascript:void(0);">无物流完成</a></li>
        <li><a class="js-noticeDeliver" href="javascript:void(0);">通知提车</a></li>
        <li><a class="js-noticeCheck" data-flag="delivery" href="javascript:void(0);">通知交车</a></li>
      </ul>
    </div>
    <div class="dropdown">
      <button class="btn btn-primary btn-sm" type="button" data-toggle="dropdown" disabled="disabled">运输操作<span class="caret"></span></button>
      <ul class="dropdown-menu">
        <li><a class="js-noticeCheck" data-flag="shipment" href="javascript:void(0);">提车完成</a></li>
        <!--<li><a class="js-completePickcar" data-flag="shipment" href="javascript:void(0);">提车完成</a></li>-->
        <li><a class="js-uploadTime" href="javascript:void(0);">发运时间</a></li>
        <li><a class="js-uploadWay" href="javascript:void(0);">在途位置</a></li>
        <li><a class="js-uploadWayRemarks" href="javascript:void(0);">在途备注</a></li>
        <li><a class="js-noticeCheck" data-flag="arrive" href="javascript:void(0);">到达</a></li>

      </ul>
    </div>
    <div class="dropdown">
      <button class="btn btn-primary btn-sm" type="button" data-toggle="dropdown" disabled="disabled">信息维护<span class="caret"></span></button>
      <ul class="dropdown-menu">
        <li><a class="js-noticePickCarsContact" href="javascript:void(0);">录入提车人</a></li>
        <li><a class="js-noticePickCars" href="javascript:void(0);">变更目的仓</a></li>
        <li><a class="js-noticeKeepCars" href="javascript:void(0);">运输车辆信息</a></li>
      </ul>
    </div>
    <div class="dropdown">
      <button type="button" disabled="disabled" class="Operation btn btn-primary btn-sm Table-action--batch js-multiAbnormal" title="" data-original-title="对选中条目进行批量操作">标记异常</button>
    </div>
    <div class="dropdown">
      <button class="btn btn-primary btn-sm" type="button" data-toggle="dropdown" disabled="disabled">电子保单<span class="caret"></span></button>
      <ul class="dropdown-menu">
        <li><a class="js-create-electronic-insurance" href="javascript:void(0);">创建保单</a></li>
        <li><a class="js-cancel-insurance" href="javascript:void(0);">退保</a></li>
      </ul>
    </div>

    <div class="dropdown">
      <button type="button" disabled="disabled" class="Operation btn btn-primary btn-sm Table-action--batch js-showUploadBill" title="" data-original-title="对选中条目进行批量操作">批量上传交车单</button>
    </div>

    <div class="dropdown">
      <div class="post-uniques">批量上传车架号</div>
    </div>

  </div>
</th:block>
  `).then(htmlList => { 
    fs.writeFileSync('log.txt', htmlList.join(','))
    expect(htmlList).toEqual(
    ['<html>', '<head>','</head>', '<body>',
     '</body>', '</html>']
  ) } )
})
