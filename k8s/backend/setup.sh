docker build -t de_code_submit .

kubectl apply -f django-deployment.yaml
kubectl port-forward svc/decode 8000:80