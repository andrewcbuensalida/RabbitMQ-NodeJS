https://www.youtube.com/playlist?list=PLrwNNiB6YOA3Z3JfOUMKE6PmnpmVAJgTK

lucid chart https://lucid.app/lucidchart/538d2f80-f124-4352-97e6-bf6c2fcab3f2/edit?view_items=lk2ip6I5.mxA&invitationId=inv_c17027bf-ac60-4b12-ae66-443068233889

Install docker
run rabbitmq container
   docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management

add -d to make it detached

check if it's running
  docker ps -a

To run hello_world/send.js
  node send
same for receive.js

Go to rabbitmq management console, In browser
  http://localhost:15672/
Username and password is "guest"

