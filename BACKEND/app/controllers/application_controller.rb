class ApplicationController < ActionController::API
    # The secret should be stored in your ENVIRONMENT, not as a variablr 
    require "active_storage"
    APP_SECRET = 'password'

    def authenticate
        #puts request.headers['Authorization']
        decoded_token = JWT.decode(request.headers['Authorization'], APP_SECRET, true, {algorithm: 'HS256'})
        user = User.find(decoded_token[0]['user_id'])
        if user
            @current_user = user
        else 
            raise 'SECURITY ALERT!'
        end
    end
end
