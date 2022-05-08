Here you can find some useful informations about ledger infrastructure. Some knowledge is necessary to be used with the following API.

## Wallets
When you are interacting with the ledger, there are wallets to access rights for the channel.
Wallet contains a set of user identities to authentificate and authorize readings/writings into the ledger.
We have general wallets to be used in backend, as you can see in the list bellow:
+ `admin` (string) - can be used for general requests
+ `student` (string) - should be used in the context of a student 

Those wallets can be used as a `user_id` in the following API functions. However, it there is a write request, you should use specific user's id. This only applies for a `faculty_member` user type.
::: note
When using any method that requires the `user_id` parameter from the context of a student, please pass the string 'student' as the `user_id`.
:::

## List of Entities
The following list bellow, will describe the project entities based on this [Class Diagram](ais_database_v2.drawio.svg).
::: note
The following list describes the permanent location of the entities. However, consider this as a information only, our API retrieves data automatically from the correct location according to the entity name entered.
:::

+ Ledger
    + `student`
    + `address`
    + `thesis`
    + `faculty_member`
    + `course_result`
+ CouchDB
    + `user`
    + `system_authentification`
    + `user_role`
    + `system_credibility`
    + `study_info`
    + `study_programme`
    + `study_form`
    + `study_field`
    + `study_type`
    + `faculty`
    + `university`
    + `publication_status`
    + `publication_type`
    + `publication_file`
    + `grading_record`
    + `final_result`
    + `midterm_result`
    + `seminar_grading_record`
    + `academic_year`
    + `lecturer_level`
    + `course_lecturer`
    + `course`

::: warning
#### <i class="fa fa-warning"></i> Caution
If you are trying to query `student` or `faculty_member`, do not use it as a `entity_name` parameter. You should call the getter function just with `user` as a `entity_name` parameter. Then you will need to filter the proper entity type.
:::

## Persistance
The project persistance stucture consist of a NonSQL database (CouchDB) and blockchain network (using hyperledger fabric framework). We are able to read and write from/into the persistance. Location of the web service, can be found in the following links:
+ Web address
    
    + [CouchDB](http://localhost:5984/_utils/)
    + [Ledger](http://localhost:5984/_utils/#database/mychannel_fabcar/_all_docs)

Login details, are the same for both types of persistance, since they are running on the same web service. Login details can be found in the following list:

+ Login details
    
    + name: `admin`
    + password: `adminpw`
