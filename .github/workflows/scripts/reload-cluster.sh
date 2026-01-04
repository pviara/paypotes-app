check_cluster_running() {
    local app_name="$1"
    pm2 save
    pm2 list | grep -w "$app_name" | grep -v grep > /dev/null
    return $?
}

if check_cluster_running "paypot-app"; then
        echo "Already running cluster paypot-app"
        pm2 reload paypot-app
else
        echo "Cluster paypot-app not running yet"
        pm2 start ./.github/workflows/res/ecosystem.yml
fi