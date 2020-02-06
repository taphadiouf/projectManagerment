<aura:application extends="force:slds" >
    <div class="slds-grid slds-theme_default" >
      <!--
  First column
-->
      <div class="slds-col" id="sidebar">
          <c:SPM_SidebarCmp/>
      </div>
      <!--
  Second column
-->
      <div class="slds-col" id="sc">
          <c:SPM_HeaderCmp/>
          <c:SPM_MultipleExpenseFormCmp/>
      </div>
  </div>
    
</aura:application>