class LeadManagerController < ApplicationController
  layout 'lead_manager_form', only: [:form]

  def form
    @params = params
    @params[:env] ||= 'production'
  end

end