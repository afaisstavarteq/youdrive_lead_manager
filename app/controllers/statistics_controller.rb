class StatisticsController < ApplicationController
  layout 'statistic', only: [:index]

  def index
    @params = params
  end

end