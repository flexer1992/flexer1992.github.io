sourcePath=$1
destinationPath=$2

echo $sourcePath
echo $destinationPath;

cd $sourcePath

# shellcheck disable=SC2045
for entry in $(ls $sourcePath)
do
  cp $sourcePath"/"$entry $destinationPath"/"$entry
done

cd $destinationPath
git status
git add -A
git commit -m "deploy commit"
git push origin main