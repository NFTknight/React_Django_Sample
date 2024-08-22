kubectl apply -f postgres-config.yaml
kubectl apply -f postgres-pvc-pv.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-service.yaml
kubectl exec -it [pod-name] --  psql -h localhost -U admin --password -p 5432 postgresdb