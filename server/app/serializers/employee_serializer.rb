class EmployeeSerializer < BaseSerializer
  attributes :id,
             :first_name,
             :last_name,
             :phone_number,
             :admin
end
