<aura:application access="global" extends="force:slds" >
    
  <aura:attribute name="stagenames" type="Object[]" default="[
  {
    'label': 'Annual Review',
    'value': 'Annual Review'
  },
  {
    'label': 'Watching Rates',
    'value': 'Watching Rates'
  },
  {
    'label': 'Initial Contact',
    'value': 'Initial Contact'
  },
  {
    'label': 'Application',
    'value': 'Application'
  },
  {
    'label': 'Waiting for Qualifying Documentation',
    'value': 'Waiting for Qualifying Documentation'
  },
  {
    'label': 'Qualifying Documentation Review',
    'value': 'Qualifying Documentation Review'
  },
  {
    'label': 'Additional Documentation Requested',
    'value': 'Additional Documentation Requested'
  },
   {
    'label': 'Submit to Ops',
    'value': 'Submit to Ops'
  },
   {
    'label': 'Disclosures Sent',
    'value': 'Disclosures Sent'
  },
  {
    'label': '24 Hour Follow Up',
    'value': '24 Hour Follow Up'
  },
  {
    'label': '48 Hour Follow Up',
    'value': '48 Hour Follow Up'
  },
  {
    'label': 'Initial Items Received',
    'value': 'Initial Items Received'
  },
  {
    'label': 'Additional Items Requested',
    'value': 'Additional Items Requested'
  },
  {
    'label': 'Additional Items Received',
    'value': 'Additional Items Received'
  },
  {
    'label': 'On Hold',
    'value': 'On Hold'
  },
  {
    'label': 'Underwriting Conditions Received',
    'value': 'Underwriting Conditions Received'
  },
  {
    'label': 'Waiting on Conditions',
    'value': 'Waiting on Conditions'
  },
  {
    'label': 'Ready for Re-Submission',
    'value': 'Ready for Re-Submission'
  },
  {
    'label': 'Conditions Submitted to Underwriting',
    'value': 'Conditions Submitted to Underwriting'
  },
  {
    'label': 'Clear to Close',
    'value': 'Clear to Close'
  },
  {
    'label': 'Docs Ordered',
    'value': 'Docs Ordered'
  },
  {
    'label': 'Docs Out',
    'value': 'Docs Out'
  },
  {
    'label': 'Closed Won',
    'value': 'Closed Won'
  },
  {
    'label': 'Closed Lost',
    'value': 'Closed Lost'
  },
  {
    'label': 'Suspect',
    'value': 'Suspect'
  },
  {
    'label': 'Prospect',
    'value': 'Prospect'
  },
  {
    'label': 'Candidate',
    'value': 'Candidate'
  },
  {
    'label': 'Recruit',
    'value': 'Recruit'
  },
  {
    'label': 'Employee',
    'value': 'Employee'
  },
  {
    'label': 'Closed Lost - Nurture',
    'value': 'Closed Lost - Nurture'
  },
  {
    'label': 'Closed Lost - Rejected',
    'value': 'Closed Lost - Rejected'
  }
  ]"/>
    
  <aura:attribute name="stagename" type="Object[]" default="[
  {
    'label': 'In Credit Repair',
    'value': 'In Credit Repair'
  },
  {
    'label': 'Annual Review',
    'value': 'Annual Review'
  },
  {
    'label': 'Watching Rates',
    'value': 'Watching Rates'
  }]"/>
    
  <div class="slds">
    <div class="slds-box">
      <c:DragCmp fieldName="Opportunity Stage" allValues="{!v.stagenames}" selectedValues="{!v.stagename}"/>
    </div>     
  </div>
</aura:application>