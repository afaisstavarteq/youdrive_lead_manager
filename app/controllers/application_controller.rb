class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #before_filter :authenticate
  protect_from_forgery with: :exception

  force_ssl if: :ssl_configured?

  PAGE_SESSION_KEY = "_youdrive_learner_statistics"

  def absolute_url
    request.base_url + request.original_fullpath
  end

  def handle_exception(exception, msg=nil)
    Honeybadger.notify exception

    Rails.logger.info "#{ '$' * 50}"
    Rails.logger.info "Exception custom msg: #{msg}"
    Rails.logger.info exception
    Rails.logger.info exception.backtrace
    Rails.logger.info "#{ '$' * 50}"
  end

  def ssl_configured?
    !Rails.env.development?
  end

end