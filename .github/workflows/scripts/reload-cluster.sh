check_cluster_running() {
    local app_name="$1"
    pm2 save
    pm2 list | grep -w "$app_name" | grep -v grep > /dev/null
    return $?
}

if check_cluster_running "paypotes-app"; then
        echo "Already running cluster paypotes-app"
        pm2 reload paypotes-app
else
        echo "Cluster paypotes-app not running yet"
        pm2 start ./.github/workflows/res/ecosystem.yml
fi